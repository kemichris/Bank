import express from 'express'
import {protect, authorize} from '../middlewares/auth.middleware.js';

import { upload } from '../middlewares/upload.middleware.js';

import { createPaymentMethod } from '../controllers/paymentMethod.controller.js';


// create payment method
router.post(
    '/payment-method',
    protect,
    authorize('admin'),
    upload.single('qrCode'),
    createPaymentMethod
);