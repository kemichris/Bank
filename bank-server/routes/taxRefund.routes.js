import express from 'express'
import {protect, authorize} from '../middlewares/auth.middleware.js';
import { submitTaxRefundRequest } from '../services/taxRefund.service.js';

const router = express.Router()

router.post(
    '/submit-request',
    protect,
    authorize('user'),
    submitTaxRefundRequest
);

export default router