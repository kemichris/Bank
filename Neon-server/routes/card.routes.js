import express from 'express'
import {protect, authorize} from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { cardRequestSchema } from '../validators/card.validator.js';
import { cardRequest, approveCardRequest } from '../controllers/card.controller.js';

const router = express.Router

// Card request
router.post('/request', protect, authorize('user'), validate(cardRequestSchema), cardRequest);

// approve card request
router.patch('/approve/:id', protect, authorize('admin', 'manager', 'superadmin'), approveCardRequest)

export default router;