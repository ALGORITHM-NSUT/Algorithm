import projectSchema from "../models/ProjectModel.js";
import formDataSchema from "../models/formDataModel.js";
import { Octokit } from "@octokit/rest";

export const updateProject = async (req, res) => {
  try {
    const { title, description, lead, contributors, githubUrl } = req.body.projectData;

    if (req.user._id != lead) {
      return res.status(401).json({ message: 'unauthorized' });
    }
    if (!description) {
      return res.status(406).json({ message: 'check description' });
    }

    const project = await projectSchema.findOne({ title: title });
    if (!project) {
      return res.status(404).json({ message: 'project not found' });
    }

    const contributorEmails = contributors; // Assume contributors is an array of email strings
    const foundContributors = await formDataSchema.find({ email: { $in: contributorEmails } });

    if (foundContributors.length !== contributorEmails.length) {
      return res.status(404).json({ message: 'Some contributors not found' });
    }

    const contributorIDs = foundContributors.map(contributor => contributor._id);
    const contributorGitProfiles = foundContributors.map(contributor => contributor.githubProfile);

    const previousContributorIDs = project.contributors.map(contributor => contributor.toString());
    const removedContributorIDs = previousContributorIDs.filter(id => !contributorIDs.includes(id));

    const removedContributors = await formDataSchema.find({ _id: { $in: removedContributorIDs } });
    const removedContributorGitProfiles = removedContributors.map(contributor => contributor.githubProfile);

    // GitHub API instance
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const [owner, repo] = githubUrl.split('/').slice(-2); // Get owner and repo from the GitHub URL

    // Remove old contributors from GitHub
    for (const username of removedContributorGitProfiles) {
      try {
        await octokit.repos.removeCollaborator({
          owner,
          repo,
          username
        });
      } catch (error) {
        console.log(`Failed to remove ${username} as a collaborator:`, error.message);
      }
    }

    project.description = description;
    project.githubUrl = githubUrl;
    project.contributors = contributorIDs;

    const savedProject = await project.save();

    res.status(201).json({ message: 'Project updated successfully', project: savedProject });
  } catch (error) {
    res.status(500).json({ message: 'Error saving project', error: error.message });
  }
};
