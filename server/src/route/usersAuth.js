import express from 'express';
import verifyEmail from '../controller/auth/verifyEmail.js'
import { limiter } from '../utils/rateLimiter.js'
import userSignUp from '../controller/auth/userSignUp.js';

const router = express.Router();

router.post('/verify-email', limiter, verifyEmail);
router.post('/auth/signup', limiter, userSignUp);

export default router;