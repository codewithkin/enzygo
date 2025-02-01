import express from 'express';
import verifyEmail from '../controller/auth/verifyEmail.js'
import { limiter } from '../utils/rateLimiter.js'
import userSignUp from '../controller/auth/userSignUp.js';
import userSignIn from '../controller/auth/userSignIn.js';

const router = express.Router();

router.post('/verify-email', limiter, verifyEmail);
router.post('/auth/signup', limiter, userSignUp);
router.post('/auth/signin', limiter, userSignIn);

export default router;