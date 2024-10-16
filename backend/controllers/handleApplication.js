import Project from "../models/ProjectModel.js";
import apply from "../models/joinProject.js";

export const handleApplication = async (req, res) => {
  const { title, applicant, state } = req.body;

  try {
    // Find the project by title and update its contributors array
    if (state == 1) {
      const updatedProject = await Project.findOneAndUpdate(
        { title }, // Search criteria
        { $addToSet: { contributors: applicant } }, // Update operation
        { new: true, runValidators: true } // Options: return updated document and validate
      );
      // Check if the project was found and updated
      if (!updatedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }
    }
    const existingApp = await apply.findOneAndDelete({ title: title, applier: applicant });
    res.status(200).json({ message: 'Applicant handled successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Could not add applicant' });
  }
};
