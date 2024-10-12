// routes/formRoutes.js
import express from 'express';
import { submitFormData } from '../controllers/formController.js';
import { home } from '../controllers/home.js';
import { getProjects } from '../controllers/ProjectController.js';
import { getCoreMembers } from '../controllers/coreMemberController.js';
import { submitapplication } from '../controllers/applicationController.js';

const router = express.Router();

// get
router.get('/', home)
router.get("/core", getCoreMembers)
router.get("/projects", getProjects)

// post
router.post('/form', submitFormData);
router.post('/application', submitapplication);

export default router;
