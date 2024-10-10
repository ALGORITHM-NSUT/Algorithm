// routes/formRoutes.js
import express from 'express';
import {submitFormData } from '../controllers/formController.js';
import { home } from '../controllers/home.js';

const router = express.Router();

// get
router.get('/', home)


// post
router.post('/form', submitFormData);

export default router;
