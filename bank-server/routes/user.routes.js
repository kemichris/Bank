import express from 'express';
import { getProfile, changePassword, getDashboardData } from '../controllers/user.controller.js';
import {protect, authorize} from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { changePasswordSchema } from '../validators/user.validator.js';

const router = express.Router();

// Get logged-in user's profile
router.get('/profile', protect, authorize('user'), getProfile);

// Change password 
router.put('/change-password', protect, authorize('user'), validate(changePasswordSchema), changePassword);

// Load dashboard data 
router.get('/dashboard', protect, authorize('user'), getDashboardData)


export default router;