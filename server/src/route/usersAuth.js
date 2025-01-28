import express from 'express';
import userSignUp from '../controller/auth/userSignUp.js';

const router = express.Router();

router.post('/auth/signup',userSignUp);

export default router;