import express from 'express'
import allChat from '../controller/chatController.js/allChat.js'
import userAuth from '../middleware/auth/userAuth.js'

const router = express.Router()

router.get('/allChat', userAuth, allChat)

export default router