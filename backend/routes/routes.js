// routes/formRoutes.js
import express from 'express';
import { submitFormData } from '../controllers/formController.js';
import { home } from '../controllers/home.js';
import { getProjects } from '../controllers/ProjectController.js';
import { getCoreMembers } from '../controllers/coreMemberController.js';
import { submitapplication } from '../controllers/applicationController.js';
import { checkapplication } from '../controllers/checkApplication.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { handleApplication } from '../controllers/handleApplication.js';
import { addProject } from '../controllers/addProject.js'
import { deleteProject } from '../controllers/deleteProject.js';
import { updateProject } from '../controllers/updateProject.js';

const router = express.Router();

// get
router.get('/', home)
router.get("/core", getCoreMembers)
router.route("/projects").get(isAuthenticated, getProjects);


// post
router.post('/form', submitFormData);
router.route("/application").post(isAuthenticated, submitapplication);
router.route("/checkapplication").post(isAuthenticated, checkapplication);
router.route("/handleApplication").post(isAuthenticated, handleApplication);
router.route("/addProject").post(isAuthenticated, addProject);
router.route("/deleteProject").post(isAuthenticated, deleteProject);
router.route("/updateProject").post(isAuthenticated, updateProject);
export default router;
