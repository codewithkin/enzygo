import express from 'express';

const router = express.Router();
import usersReg from '../controller/userReg.js'

router.post('/register', usersReg);

export default router;