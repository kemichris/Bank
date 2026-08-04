import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = express.Router();

// Register a new user
router.post('/register', validate(registerSchema), register);

// user login
router.post('/login', validate(loginSchema), login);

export default router;