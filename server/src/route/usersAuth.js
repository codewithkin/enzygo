import express from 'express';

import userReg from '../controller/UserReg.js';

const router = express.Router();

router.post('/register',userReg);

export default router;