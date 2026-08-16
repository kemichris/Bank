import express from 'express'
import {protect, authorize} from '../middlewares/auth.middleware.js';
import { submitTaxRefundRequest, getAllTaxRefunds, deleteTaxRefund } from '../controllers/taxRefund.js';

const router = express.Router()

router.post(
    '/submit-request',
    protect,
    authorize('user'),
    submitTaxRefundRequest
);

router.get(
    '/',
    protect,
    authorize('admin'),
    getAllTaxRefunds
);

router.delete(
    '/:id',
    protect,
    authorize('admin'),
    deleteTaxRefund
);


export default router