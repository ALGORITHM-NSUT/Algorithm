import Project from "../models/ProjectModel.js";

// Controller function to fetch ongoing projects
export const getProjects = async (req, res) => {
  try {
    // Fetch all projects and populate the lead and contributors with only the 'name' field
    const projects = await Project.find()
      .populate('lead', 'name linkedinUrl')           // Fetch only the 'name' field from the lead
      .populate('contributors', 'name');  // Fetch only the 'name' field from contributors

    // Format the output with lead name and contributors' names
    const formattedProjects = projects.map(project => ({
      title: project.title,
      lead: project.lead,
      contributors: project.contributors.map(contributor => contributor.name),
      githubUrl: project.githubUrl,
      description: project.description,
      status: project.status == false ? "Ongoing" : "Compeleted"
    }));

    // Send back the formatted projects in JSON format
    res.status(200).json(formattedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
