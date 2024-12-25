// routes/formRoutes.js
import express, {application} from 'express';
import { submitFormData } from '../controllers/formController.js';
import { home } from '../controllers/home.js';
import { getProjects, updateProject, addProject, deleteProject } from '../controllers/ProjectController.js';
import { getCoreMembers } from '../controllers/coreMemberController.js';
import { submitapplication, handleApplication } from '../controllers/applicationController.js';
import { isAuthenticated } from '../middlewares/auth.js';
import {submitFeedback, getFeedback} from '../controllers/feedbackController.js';
import upload from '../config/multerconfig.js';
import { emailVerify } from '../controllers/emailVerify.js';
import { resetpass } from '../controllers/passreset.js';
import {fetchLeaderboardData, fetchAndSaveRankings, showAllUsers, fetchAndSaveInDB, deleteAllRankings, showAllRankings} from '../controllers/leaderboardController.js';

const router = express.Router();

// get
router.get('/', home);
router.get("/core", getCoreMembers);
router.route("/projects").get(isAuthenticated, getProjects);
router.get("/verify/:id", emailVerify);
router.get("/getFeedbacks", getFeedback);

// router.get('/leaderBoard/allusers', showAllUsers);
router.get('/leaderBoard/delete', deleteAllRankings );
router.get('/leaderBoard/show', showAllRankings);
router.post('/leaderBoard/save', fetchAndSaveInDB);



// post
router.post('/form', submitFormData);
router.route("/application").post(isAuthenticated, submitapplication);
router.route("/sendFeedback").post(isAuthenticated, submitFeedback );
router.route("/handleApplication").post(isAuthenticated, handleApplication);
router.route("/addProject").post(isAuthenticated, upload.array('images'), addProject);
router.route("/deleteProject").post(isAuthenticated, deleteProject);
router.route("/updateProject").post(isAuthenticated, upload.array('updateImages'), updateProject);
router.route("/resetpass/:id").post(resetpass);

export default router;
