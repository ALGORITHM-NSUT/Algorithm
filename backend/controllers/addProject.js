// Import necessary models
import projectSchema from "../models/ProjectModel.js";
import formDataSchema from "../models/formDataModel.js";

export const addProject = async (req, res) => {
  try {
    const { title, description, lead, contributors, githubUrl } = req.body.projectData;
    const admin = req.user.admin;
    if (!admin) {
      return res.status(401).json({ message: 'unauthorized' });
    }
    // Find the lead by email
    const leadUser = await formDataSchema.findOne({ email: lead });
    if (!leadUser) {
      return res.status(404).json({ message: 'Lead user not found' });
    }

    // Find contributors by their emails
    const contributorEmails = contributors; // Assuming contributors is an array of emails
    const contributorUsers = await formDataSchema.find({ email: { $in: contributorEmails } });

    // Check if all contributors were found
    if (contributorUsers.length !== contributorEmails.length) {
      return res.status(404).json({ message: 'One or more contributors not found' });
    }

    // Get ObjectIds of contributors
    const contributorIds = contributorUsers.map(user => user._id);

    // Create a new project with ObjectIds
    const newProject = new projectSchema({
      title,
      description,
      lead: leadUser._id,
      contributors: contributorIds,
      githubUrl,
    });

    // Save the project to the database
    const savedProject = await newProject.save();

    res.status(201).json({ message: 'Project saved successfully', project: savedProject });
  } catch (error) {
    res.status(500).json({ message: 'Error saving project', error: error.message });
  }
};
