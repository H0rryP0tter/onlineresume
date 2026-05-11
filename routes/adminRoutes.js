import express from 'express';
import { authorizeAdmin, getDashboard } from '../controller/adminController.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requireAuth, requireAdmin, authorizeAdmin);
router.get('/dashboard', requireAuth, requireAdmin, getDashboard);

export default router;
