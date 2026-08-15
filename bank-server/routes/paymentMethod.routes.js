import express from 'express'
import {protect, authorize} from '../middlewares/auth.middleware.js';

import { upload } from '../middlewares/upload.middleware.js';

import { createPaymentMethod } from '../controllers/paymentMethod.controller.js';

const router = express.Router()

// create payment method
router.post(
    '/create',
    protect,
    authorize('admin'),
    upload.single('qrCode'),
    createPaymentMethod
);

export default router