import express from 'express';
import verifyEmail from '../controller/userAuth.js'
import { verifyLimit } from '../utils/rateLimiter.js'
import userSignUp from '../controller/auth/userSignUp.js';

const router = express.Router();

router.post('/verify-email', verifyEmail);
router.post('/auth/signup',userSignUp);

export default router;