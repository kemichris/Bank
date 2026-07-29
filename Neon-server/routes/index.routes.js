import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import transactionRoutes from './transaction.routes.js';
import cardRoutes from './card.routes.js'

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/transaction', transactionRoutes);
router.use('/card', cardRoutes);


export default router;