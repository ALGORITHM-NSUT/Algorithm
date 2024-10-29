import Project from "../models/ProjectModel.js";
import apply from "../models/joinProject.js";
import { Octokit } from "@octokit/rest";
import FormData from "../models/formDataModel.js";

export const handleApplication = async (req, res) => {
  const { title, applicant, state } = req.body;
  const user = req.user._id;
  const project = await Project.findOne({ title });
  const userProfile = await FormData.findOne({ _id: applicant });
  const userGit = userProfile.githubProfile;
  if (String(project.lead) != user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {

    if (state == 1) {
      const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
      try {

        const response = await octokit.repos.addCollaborator({
          owner: "ALGORITHM-NSUT",
          repo: project.githubUrl.split("/").pop(),
          username: userGit,
          permission: "write",
        });
        const updatedProject = await Project.findOneAndUpdate(
          { title }, // Search criteria
          { $addToSet: { contributors: applicant } },

          { new: true, runValidators: true } // Options: return updated document and validate
        );
        // Check if the project was found and updated
        if (!updatedProject) {
          return res.status(404).json({ message: 'Project not found' });
        }
      } catch (error) {
        // console.log(error);
        return res.status(500).json({ message: 'Could not add to github' });
      }

    }
    const existingApp = await apply.findOneAndDelete({ title: title, applier: applicant });
    res.status(200).json({ message: 'Applicant handled successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Could not add applicant' });
  }
};
