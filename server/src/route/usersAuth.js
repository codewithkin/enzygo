import express from 'express';

import userReg from '../controller/userReg.js';
import verifyEmail from '../controller/userAuth.js';
import {loginLimit} from '../utils/rateLimiter.js'

const router = express.Router();

router.post('/register', userReg);
router.post('/verify-email', loginLimit, verifyEmail);

export default router;