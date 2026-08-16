import express from 'express'
import {protect, authorize} from '../middlewares/auth.middleware.js';
import * as loanController from '../controllers/loan.controller.js';

const router = express.Router()

router.post(
    '/apply',
    protect,
    authorize('user'),
    loanController.applyForLoan
);

router.get(
    '/',
    protect,
    authorize('admin'),
    loanController.gettAllLoans
);

router.get(
    '/:loanId',
    protect,
    authorize('admin'),
    loanController.getLoan
);

router.patch(
  '/:loanId/status',
  protect,
  authorize('admin'),
  loanController.updateLoanStatus
);



export default router