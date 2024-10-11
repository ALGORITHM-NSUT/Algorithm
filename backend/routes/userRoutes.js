import express from 'express'
import { getMyProfile, login, logout, register } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';



const router = express.Router();


// to register a new user 
router.route('/register').post(register)

// Login
router.route('/login').post(login)

// Logout
router.route('/logout').get(logout)

// get my profile
router.route("/me").get(isAuthenticated, getMyProfile)


export default router;