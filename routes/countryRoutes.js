import express from 'express';
import { getCallingCodes } from '../controller/countryController.js';

const router = express.Router();

router.get('/calling-codes', getCallingCodes);

export default router;
