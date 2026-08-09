import express from 'express'
import {protect, authorize} from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { cardRequestSchema } from '../validators/card.validator.js';
import { cardRequest, approveCardRequest, blockCard, unblockCard, cancelCard, getActiveCard} from '../controllers/card.controller.js';
import User from '../models/user.model.js';


const router = express.Router()

// Card request
router.post('/request', protect, authorize('user'), validate(cardRequestSchema), cardRequest);

// approve card request
router.patch('/approve/:id', protect, authorize('admin', 'manager', 'superadmin'), approveCardRequest);

// block card
router.patch('/block/:id', protect, authorize('user', 'admin', 'manager', 'superadmin'), blockCard);

// block card
router.patch('/unblock/:id', protect, authorize('user', 'admin', 'manager', 'superadmin'), unblockCard);

// cancel card
router.patch('/cancel/:id', protect, authorize('user', 'admin', 'manager', 'superadmin'), cancelCard);

// Get active card 
router.get('/active', protect, authorize('user'), getActiveCard )

export default router;