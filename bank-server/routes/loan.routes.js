import express from 'express'
import {protect, authorize} from '../middlewares/auth.middleware.js';
import { applyForLoan } from '../controllers/loan.controller.js';

const router = express.Router()

router.post(
    '/apply',
    protect,
    authorize('user'),
    applyForLoan
);

export default router