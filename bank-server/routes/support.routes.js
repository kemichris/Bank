import express from 'express'
import {protect, authorize} from '../middlewares/auth.middleware.js';
import { createSupportTicket } from '../controllers/support.controller.js';

const router = express.Router()

router.post(
    '/ticket',
    protect,
    createSupportTicket
);

export default router