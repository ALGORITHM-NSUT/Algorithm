import express from 'express'
import { getMyProfile, login, logout, register } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';



const router = express.Router();

// to register a new user
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/me', isAuthenticated, getMyProfile)

export default router;