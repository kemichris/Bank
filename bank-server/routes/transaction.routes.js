import express from 'express';
import {protect, authorize} from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import {upload} from '../middlewares/upload.middleware.js';
import { transferSchema, depositSchema } from '../validators/transaction.validator.js';
import { transferFunds, depositFunds, getTransactionHistory } from '../controllers/transaction.controller.js';

const router = express.Router();

// Transfer funds route
router.post('/transfer', protect, authorize('user'), validate(transferSchema), transferFunds);

// deposit funds route
router.post('/deposit', protect, authorize('user'), upload.single('receipt'), validate(depositSchema), depositFunds);

// Get transaction history
router.get('/history', protect, authorize('user'), getTransactionHistory);

export default router;

