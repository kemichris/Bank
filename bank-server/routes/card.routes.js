import express from 'express';
import { protect, authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { cardRequestSchema } from '../validators/card.validator.js';
import * as cardController from '../controllers/card.controller.js';

const router = express.Router();

// Card request
router.post(
  '/request',
  protect,
  authorize('user'),
  validate(cardRequestSchema),
  cardController.cardRequest,
);

// Get active card
router.get(
  '/overview',
  protect,
  authorize('user'),
  cardController.getCardOverview,
);

// Get cards
router.get(
  '/',
  protect,
  authorize('admin'),
  cardController.getCards,
);

// Get a single card
router.get(
  '/:cardId',
  protect,
  authorize('admin'),
  cardController.getCard,
);

// Approve card request
router.patch(
  '/approve/:id',
  protect,
  authorize('admin', 'manager', 'superadmin'),
  cardController.approveCardRequest,
);

// Reject card request
router.patch(
  '/reject/:id',
  protect,
  authorize('admin', 'manager', 'superadmin'),
  cardController.rejectCardRequest,
);

// Block card
router.patch(
  '/block/:id',
  protect,
  authorize('user', 'admin', 'manager', 'superadmin'),
  cardController.blockCard,
);

// Unblock card
router.patch(
  '/unblock/:id',
  protect,
  authorize('user', 'admin', 'manager', 'superadmin'),
  cardController.unblockCard,
);

// Cancel card
router.patch(
  '/cancel/:id',
  protect,
  authorize('user', 'admin', 'manager', 'superadmin'),
  cardController.cancelCard,
);

// Delete card
router.delete(
  '/:id',
  protect,
  authorize('admin'),
  cardController.deleteCard,
);

export default router;