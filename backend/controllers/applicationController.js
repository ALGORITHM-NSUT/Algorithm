import Project from "../models/ProjectModel.js";
import apply from "../models/joinProject.js";
import { Octokit } from "@octokit/rest";
import FormData from "../models/formDataModel.js";

export const submitapplication = async (req, res) => {
  const { title, lead } = req.body;
  const applier = req.user._id;
  try {
    const application = new apply({
      title,
      lead,
      applier
    });
    const savedapplication = await application.save();
    res.status(201).json({ message: 'Form data saved successfully', savedapplication });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error saving form data', error });
  }
};



export const handleApplication = async (req, res) => {
  const { title, applicant, state } = req.body;
  const user = req.user._id;
  const project = await Project.findOne({ title });
  const userProfile = await FormData.findOne({ _id: applicant });
  const userGit = userProfile.githubProfile.split('/').pop();
  const org = "ALGORITHM-NSUT";
  if (String(project.lead) != user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    if (state == 1) {
      const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
      try {
        const updatedProject = await Project.findOneAndUpdate(
          { title },
          { $addToSet: { contributors: applicant } },
          { new: true, runValidators: true }
        );
        if (!updatedProject) {
          return res.status(404).json({ message: 'Project not found' });
        }
        try {
          await octokit.rest.orgs.getMembershipForUser({
            org,
            username: userGit
          });
        } catch (error) {
          if (error.status === 404) {
            try {
              const response = await octokit.rest.orgs.createInvitation({
                org,
                invitee_id: userGit
              });
            } catch (inviteError) {
              console.log(inviteError);
            }
          }
        }
        const response = await octokit.repos.addCollaborator({
          owner: org,
          repo: project.githubUrl.split("/").pop(),
          username: userGit,
          permission: "write",
        });

      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Could not add to github' });
      }
    }
    const existingApp = await apply.findOneAndDelete({ title: title, applier: applicant });
    res.status(200).json({ message: 'Applicant handled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not add applicant' });
  }
};
