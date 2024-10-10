import express from 'express'
import { login, logout, register } from '../controllers/userController.js';

const router = express.Router();


// to register a new user 
router.route('/register').post(register)

// Login
router.route('/login').post(login)

// Logout
router.route('/logout').get(logout)


export default router;