// routes/formRoutes.js
import express from 'express';
import { submitFormData } from '../controllers/formController.js';
import { home } from '../controllers/home.js';
import { getProjects } from '../controllers/ProjectController.js';
import { getCoreMembers } from '../controllers/coreMemberController.js';
import { getMyProfile, login, logout, register } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

// get
router.get('/', home)
router.get("/core", getCoreMembers)
router.get("/projects", getProjects)

// post
router.post('/form', submitFormData);
// to register a new user 
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/me', isAuthenticated, getMyProfile)

export default router;
