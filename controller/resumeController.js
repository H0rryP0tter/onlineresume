import { Resume } from '../models/resume.js';

// Converts { personal: { fullName: 'X' } } → { 'personal.fullName': 'X' }
// so $set updates individual fields instead of replacing the whole subdocument.
// Empty nested objects are skipped so they never wipe existing data.
function flattenDot(obj, prefix = '') {
    return Object.entries(obj).reduce((acc, [key, val]) => {
        const path = prefix ? `${prefix}.${key}` : key;
        if (val !== null && !Array.isArray(val) && typeof val === 'object' && !(val instanceof Date)) {
            if (Object.keys(val).length > 0) Object.assign(acc, flattenDot(val, path));
        } else {
            acc[path] = val;
        }
        return acc;
    }, {});
}

export const getResume = (req, res, next) => {
    const fullName = req.params.fullName;
    Resume.find({ 'personal.fullName': fullName, userId: req.user.id })
        .then(resumes => {
            if (!resumes.length) return res.status(404).json({ message: 'No resume found' });
            res.json(resumes);
        })
        .catch(err => next(err));
};

const RESUME_LIMIT = 5;
const resumeCreateLocks = new Map();

function withResumeCreateLock(userId, task) {
    const key = String(userId);
    const previous = resumeCreateLocks.get(key) || Promise.resolve();
    const current = previous.catch(() => {}).then(task);
    resumeCreateLocks.set(key, current);
    return current.finally(() => {
        if (resumeCreateLocks.get(key) === current) {
            resumeCreateLocks.delete(key);
        }
    });
}

export const saveResume = (req, res, next) => {
    const { _id, userId: _userId, ...update } = req.body;
    return withResumeCreateLock(req.user.id, () => Resume.countDocuments({ userId: req.user.id })
        .then(count => {
            if (count >= RESUME_LIMIT)
                return res.status(403).json({ message: `Resume limit reached (max ${RESUME_LIMIT})` });
            return new Resume({ ...update, userId: req.user.id }).save()
                .then(resume => res.status(201).json({ message: 'Saved successfully', data: resume }));
        }))
        .catch(next);
};

export const getAllResumes = (req, res, next) => {
    const { search } = req.query;
    let query = { userId: req.user.id };

    if (search) {
        if (search.length > 100)
            return res.status(400).json({ status: 'error', message: 'Search query too long (max 100 characters)' });
        const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        query = {
            userId: req.user.id,
            $or: [
                { 'personal.fullName':             { $regex: escaped, $options: 'i' } },
                { 'skills.technicalSkills':        { $regex: escaped, $options: 'i' } },
                { 'skills.softSkills':             { $regex: escaped, $options: 'i' } },
                { 'experience.jobRoleSlug':        { $regex: escaped, $options: 'i' } },
                { 'experience.currentDesignation': { $regex: escaped, $options: 'i' } }
            ]
        };
    }

    Resume.find(query)
        .then(resumes => res.json({ count: resumes.length, results: resumes }))
        .catch(err => next(err));
};

export const findResumeById = (req, res, next) => {
    const id = req.params.id;

    Resume.findOne({ _id: id, userId: req.user.id })
        .then(resume => {
            if (!resume) {
                return res.status(404).json({ message: 'Resume not found' });
            }
            res.json(resume);
        })
        .catch(err => next(err));
};

export const updateResume = (req, res, next) => {
    const id = req.params.id;
    const { userId: _userId, _id, ...dataToUpdate } = req.body;

    Resume.findOneAndUpdate({ _id: id, userId: req.user.id }, { $set: flattenDot(dataToUpdate) }, { returnDocument: 'after', runValidators: true })
        .then(updatedResume => {
            if (!updatedResume) {
                return res.status(404).json({ message: 'Resume not found' });
            }
            res.json({ message: 'Update successful', data: updatedResume });
        })
        .catch(err => next(err));
};

export const deleteResumeById = (req, res, next) => {
    const id = req.params.id;

    Resume.findOneAndDelete({ _id: id, userId: req.user.id })
        .then(resume => {
            if (!resume) {
                return res.status(404).json({ message: 'Resume not found' });
            }
            res.json({ message: 'Resume deleted successfully' });
        })
        .catch(err => next(err));
};
