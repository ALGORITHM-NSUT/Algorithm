import express from 'express';
const router = express.Router();
import Project from '../models/ProjectModel.js'; // Assuming you have a Project model

// Route to create a new project
router.post('/projects', async (req, res) => {
  try {
    const { title, description, lead, githubUrl, contributors } = req.body;

    // Check if a project with the same title already exists
    const existingProject = await Project.findOne({ title });
    if (existingProject) {
      return res.status(400).json({ message: 'A project with this title already exists' });
    }

    // Create and save the new project
    const newProject = new Project({
      title,
      description,
      lead,
      githubUrl,
      contributors,
    });

    await newProject.save();
    res.status(201).json({ message: 'Project added successfully' });

  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to add project' });
  }
});

export default router;
