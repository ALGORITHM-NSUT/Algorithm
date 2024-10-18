// Import necessary models
import projectSchema from "../models/ProjectModel.js";
import formDataSchema from "../models/formDataModel.js";

export const updateProject = async (req, res) => {
  try {
    const { title, description, lead, contributors, githubUrl } = req.body.projectData;

    if (req.user._id != lead) {
      return res.status(401).json({ message: 'unauthorized' });
    }
    if (!description) {
      return res.status(406).json({ message: 'check description' });
    }
    // Find the lead by email
    const project = await projectSchema.findOne({ title: title });
    if (!project) {
      return res.status(404).json({ message: 'project not found' });
    }
    const contributorEmails = contributors; // Assume contributors is an array of email strings
    const foundContributors = await formDataSchema.find({ email: { $in: contributorEmails } });

    // Check if all contributors were found
    if (foundContributors.length !== contributorEmails.length) {
      return res.status(404).json({ message: 'Some contributors not found' });
    }
    const contributorIDs = foundContributors.map(contributor => contributor._id);
    // Update project fields
    project.description = description;
    project.githubUrl = githubUrl;
    project.contributors = contributorIDs; // Replace previous ObjectIDs with new ones

    // Save the updated project
    const savedProject = await project.save();

    res.status(201).json({ message: 'Project updated successfully', project: savedProject });
  } catch (error) {
    res.status(500).json({ message: 'Error saving project', error: error.message });
  }
};
