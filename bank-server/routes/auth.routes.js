import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';
import { validate } from '../middlewares/validate.middleware.js';
import { verifyEmail, resendVerificationCode, getEmailVerificationStatus } from '../controllers/user.controller.js';
import { verifyEmailSchema } from '../validators/user.validator.js';


const router = express.Router();

// Register a new user
router.post('/register', validate(registerSchema), register);

// user login
router.post('/login', validate(loginSchema), login);

// verify email 
router.post('/verify-email', validate(verifyEmailSchema), verifyEmail);

// resend email verification code
router.post('/resend-verification-code', resendVerificationCode);

// email  status
router.get('/email-verification-status', getEmailVerificationStatus);

export default router;