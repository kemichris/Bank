import express from 'express'
import {protect, authorize} from '../middlewares/auth.middleware.js';
import { submitTaxRefundRequest } from '../controllers/taxRefund.js';

const router = express.Router()

router.post(
    '/submit-request',
    protect,
    authorize('user'),
    submitTaxRefundRequest
);

export default router