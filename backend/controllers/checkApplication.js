import apply from "../models/joinProject.js";
import Project from "../models/ProjectModel.js";
import FormData from "../models/formDataModel.js";

export const checkapplication = async (req, res) => {
  const { title, lead, applier } = req.body;

  try {
    const existingApp = await apply.findOne({ title, applier });
    const contributor = await FormData.findOne({ email: applier });
    const existingContributor = await Project.findOne({
      contributors: contributor._id
    }).populate({
      path: 'contributors',
      select: 'email'
    });

    if (existingApp || existingContributor) {
      // If found, respond accordingly
      return res.status(200).json({ message: 'Application already exists', existingContributor });
    }
    res.status(200).json({ message: 'Application does not exist' });
  }
  catch (error) {
    res.status(500).json({ message: 'Error checking applications', error });
  }
};