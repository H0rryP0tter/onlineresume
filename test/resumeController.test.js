import test from 'node:test';
import assert from 'node:assert/strict';
import { getAllResumes, saveResume, updateResume } from '../controller/resumeController.js';
import { Resume } from '../models/resume.js';

test('getAllResumes filters results by the authenticated user id', async () => {
    const originalFind = Resume.find;
    let receivedQuery;

    Resume.find = (query) => {
        receivedQuery = query;
        return Promise.resolve([]);
    };

    const req = { user: { id: 'user-1' }, query: {} };
    const res = createResponse();

    await getAllResumes(req, res, assert.ifError);

    assert.deepEqual(receivedQuery, { userId: 'user-1' });
    assert.deepEqual(res.body, { count: 0, results: [] });

    Resume.find = originalFind;
});

test('getAllResumes keeps search scoped to the authenticated user id', async () => {
    const originalFind = Resume.find;
    let receivedQuery;

    Resume.find = (query) => {
        receivedQuery = query;
        return Promise.resolve([]);
    };

    const req = { user: { id: 'user-1' }, query: { search: 'node' } };
    const res = createResponse();

    await getAllResumes(req, res, assert.ifError);

    assert.equal(receivedQuery.userId, 'user-1');
    assert.equal(receivedQuery.$or.length, 5);
    assert.deepEqual(receivedQuery.$or[0], { 'personal.fullName':             { $regex: 'node', $options: 'i' } });
    assert.deepEqual(receivedQuery.$or[1], { 'skills.technicalSkills':        { $regex: 'node', $options: 'i' } });
    assert.deepEqual(receivedQuery.$or[2], { 'skills.softSkills':             { $regex: 'node', $options: 'i' } });
    assert.deepEqual(receivedQuery.$or[3], { 'experience.jobRoleSlug':        { $regex: 'node', $options: 'i' } });
    assert.deepEqual(receivedQuery.$or[4], { 'experience.currentDesignation': { $regex: 'node', $options: 'i' } });

    Resume.find = originalFind;
});

test('saveResume ignores client userId and uses authenticated user id', async () => {
    const originalSave = Resume.prototype.save;
    const originalCountDocuments = Resume.countDocuments;
    let savedDocument;
    const userId = '507f1f77bcf86cd799439011';

    Resume.countDocuments = () => Promise.resolve(0);
    Resume.prototype.save = function save() {
        savedDocument = this;
        return Promise.resolve(this);
    };

    const req = {
        user: { id: userId },
        body: {
            userId: 'attacker-user',
            fullName: 'Test User',
            skills: ['Node.js']
        }
    };
    const res = createResponse();

    await saveResume(req, res, assert.ifError);

    assert.equal(savedDocument.userId.toString(), userId);
    assert.equal(res.statusCode, 201);

    Resume.prototype.save = originalSave;
    Resume.countDocuments = originalCountDocuments;
});

test('saveResume serializes creates for the same user before checking the resume limit', async () => {
    const originalSave = Resume.prototype.save;
    const originalCountDocuments = Resume.countDocuments;
    const userId = '507f1f77bcf86cd799439011';
    let currentCount = 4;
    let concurrentCounts = 0;
    let maxConcurrentCounts = 0;

    Resume.countDocuments = () => {
        concurrentCounts += 1;
        maxConcurrentCounts = Math.max(maxConcurrentCounts, concurrentCounts);
        return new Promise(resolve => {
            setTimeout(() => {
                concurrentCounts -= 1;
                resolve(currentCount);
            }, 20);
        });
    };
    Resume.prototype.save = function save() {
        currentCount += 1;
        return Promise.resolve(this);
    };

    const reqA = { user: { id: userId }, body: { personal: { fullName: 'First User' } } };
    const reqB = { user: { id: userId }, body: { personal: { fullName: 'Second User' } } };
    const resA = createResponse();
    const resB = createResponse();

    await Promise.all([
        saveResume(reqA, resA, assert.ifError),
        saveResume(reqB, resB, assert.ifError)
    ]);

    assert.equal(maxConcurrentCounts, 1);
    assert.equal(resA.statusCode, 201);
    assert.equal(resB.statusCode, 403);
    assert.deepEqual(resB.body, { message: 'Resume limit reached (max 5)' });

    Resume.prototype.save = originalSave;
    Resume.countDocuments = originalCountDocuments;
});

test('updateResume strips client userId and scopes update by authenticated user id', async () => {
    const originalFindOneAndUpdate = Resume.findOneAndUpdate;
    let receivedFilter;
    let receivedUpdate;

    Resume.findOneAndUpdate = (filter, update) => {
        receivedFilter = filter;
        receivedUpdate = update;
        return Promise.resolve({ _id: 'resume-1' });
    };

    const req = {
        params: { id: 'resume-1' },
        user: { id: 'user-1' },
        body: {
            userId: 'attacker-user',
            fullName: 'Updated User'
        }
    };
    const res = createResponse();

    await updateResume(req, res, assert.ifError);

    assert.deepEqual(receivedFilter, { _id: 'resume-1', userId: 'user-1' });
    assert.deepEqual(receivedUpdate, { $set: { fullName: 'Updated User' } });
    assert.equal(res.body.message, 'Update successful');

    Resume.findOneAndUpdate = originalFindOneAndUpdate;
});

function createResponse() {
    return {
        statusCode: 200,
        body: undefined,
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(payload) {
            this.body = payload;
            return this;
        }
    };
}
