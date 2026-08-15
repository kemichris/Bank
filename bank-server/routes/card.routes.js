import express from 'express'
import {protect, authorize} from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { cardRequestSchema } from '../validators/card.validator.js';
import * as cardController from '../controllers/card.controller.js';
import User from '../models/user.model.js';


const router = express.Router()

// Card request
router.post('/request', protect, authorize('user'), validate(cardRequestSchema), cardController.cardRequest);

// Get cards
router.get('/', protect, authorize('admin'), cardController.getCards);
router.get('/:cardId', protect, authorize('admin'), cardController.getCard);

// approve card request
router.patch('/approve/:id', protect, authorize('admin', 'manager', 'superadmin'), cardController.approveCardRequest);

// reject card request
router.patch('/reject/:id', protect, authorize('admin', 'manager', 'superadmin'), cardController.rejectCardRequest);

// block card
router.patch('/block/:id', protect, authorize('user', 'admin', 'manager', 'superadmin'), cardController.blockCard);

// block card
router.patch('/unblock/:id', protect, authorize('user', 'admin', 'manager', 'superadmin'), cardController.unblockCard);

// cancel card
router.patch('/cancel/:id', protect, authorize('user', 'admin', 'manager', 'superadmin'), cardController.cancelCard);

// Get active card 
router.get('/overview', protect, authorize('user'), cardController.getCardOverview )

// delete card
router.delete('/:id', protect, authorize('admin'), cardController.deleteCard);

export default router;