import express from 'express';
import { getTimeZones } from '../controller/timeZoneController.js';

const router = express.Router();

router.get('/', getTimeZones);

export default router;
