import express from 'express';
import rateLimit from 'express-rate-limit';
import { login, logout, me, register } from '../controller/authController.js';
import { requireAuth, softAuth } from '../middleware/auth.js';

const router = express.Router();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    message: { status: 'error', message: 'Too many attempts, please try again later' }
});

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/logout', logout);
router.get('/me', softAuth, me);

export default router;
