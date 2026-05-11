import express from 'express';
import rateLimit from 'express-rate-limit';
import { deleteResumeById, findResumeById, getAllResumes, getResume, saveResume, updateResume } from '../controller/resumeController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

const resumeWriteLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 60,
    message: { status: 'error', message: 'Too many requests, please try again later' }
});

router.use(requireAuth);

router.get('/all', getAllResumes);
router.get('/name/:fullName', getResume);
router.post('/save', resumeWriteLimiter, saveResume);
router.get('/:id', findResumeById);
router.patch('/:id', resumeWriteLimiter, updateResume);
router.delete('/:id', resumeWriteLimiter, deleteResumeById);

export default router;
