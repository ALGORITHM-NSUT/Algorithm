import Project from "../models/ProjectModel.js";


// Controller function to fetch ongoing projects
export const getOngoingProjects = async (req, res) => {
  try {
    const projects = await Project.find(); // Fetch all projects from the database
    res.status(200).json(projects); // Send back the projects in JSON format
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal server error' }); // Send back an error message
  }
};