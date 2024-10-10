// routes/formRoutes.js
import express from 'express';
import {submitFormData } from '../controllers/formController.js';
import { home } from '../controllers/home.js';
import { getOngoingProjects } from '../controllers/ProjectController.js';

const router = express.Router();

// get
router.get('/', home)
router.get('/ongoingProjects', getOngoingProjects)



// post
router.post('/form', submitFormData);

export default router;
