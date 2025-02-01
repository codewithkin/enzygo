import express from 'express';
import verifyEmail from '../controller/auth/userAuth.js'
import { limiter } from '../utils/rateLimiter.js'
import userSignUp from '../controller/auth/userReg.js';

const router = express.Router();

router.post('/verify-email', limiter, verifyEmail);
router.post('/auth/signup', limiter, userSignUp);

export default router;