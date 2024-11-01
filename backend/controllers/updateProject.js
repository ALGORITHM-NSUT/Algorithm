import projectSchema from "../models/ProjectModel.js";
import FormData from "../models/formDataModel.js";
import { Octokit } from "@octokit/rest";
import cloudinary from 'cloudinary';

export const updateProject = async (req, res) => {
  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    cloudinary.v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API,
      api_secret: process.env.CLOUDINARY_SECRET,
      secure: true,
    });

    const { title, description, lead, contributors, githubUrl, images } = req.body;
    const uploadImages = req.files;
    const project = await projectSchema.findOne({ title: title });
    if (!project) {
      return res.status(404).json({ message: 'project not found' });
    }

    if (req.user._id != project.lead) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    if (!description) {
      return res.status(406).json({ message: 'check description' });
    }


    if (githubUrl !== project.githubUrl) {
      const [owner, repo] = githubUrl.split('/').slice(-2);
      if (owner !== "ALGORITHM-NSUT") {
        return res.status(422).json({ message: 'URL outside organization', error: error.message });
      }
      try {
        const response = await octokit.rest.repos.get({
          owner,
          repo,
        });
      } catch (error) {
        if (error.status === 404) {
          return res.status(404).json({ message: 'Repository does not exist.', error: error.message });
        } else {
          return res.status(500).json({ message: 'Error saving project', error: error.message });
        }
      }
    }

    const newContributorIDs = [];
    const newContributorGithub = [];
    var contributorList;
    if (typeof contributors === 'string') {
      contributorList = [contributors];
    }
    else {
      contributorList = contributors;
    }
    const allContributors = await FormData.find(
      { _id: { $in: project.contributors } }
    );

    const existingEmailToIDMap = new Map(
      allContributors.map(contributor => [contributor.email, contributor._id])
    );
    const removedContributorGitProfiles = [];

    for (const contributor of allContributors) {
      if (contributorList.includes(contributor.email)) {
        newContributorIDs.push(contributor._id);
        if (githubUrl !== project.githubUrl) {
          newContributorGithub.push(contributor.githubProfile);
        }
      } else {
        removedContributorGitProfiles.push(contributor.githubProfile);
      }
    }

    // GitHub API instance
    if (removedContributorGitProfiles.length != 0 && project.githubUrl === githubUrl) {
      const [owner, repo] = githubUrl.split('/').slice(-2);
      for (var username of removedContributorGitProfiles) {
        username = username.split('/').pop();
        try {
          const { data: invitations } = await octokit.rest.repos.listInvitations({
            owner,
            repo,
          });
          const invitation = invitations.find(inv => inv.invitee.login === username);
          if (!invitation) {
            await octokit.repos.removeCollaborator({
              owner,
              repo,
              username
            });
          }
          else {
            const invitationId = invitation.id;
            const response = await octokit.repos.deleteInvitation({
              owner,
              repo,
              invitation_id: invitationId,
            });
          }
        } catch (error) {
          console.log(`Failed to remove ${username} as a collaborator:`, error.message);
        }
      }
    }
    if (project.githubUrl !== githubUrl) {
      const [owner, repo] = githubUrl.split('/').slice(-2);
      for (var username of newContributorGithub) {
        username = username.split('/').pop();
        try {
          await octokit.repos.addCollaborator({
            owner,
            repo,
            username,
            permission: "write",
          });
        } catch (error) {
          console.log(`Failed to add ${username} as a collaborator:`, error.message);
        }
      }
    }

    const photoUrls = await Promise.all(
      uploadImages.map(file => {
        return new Promise((resolve, reject) => {
          cloudinary.v2.uploader.upload_stream(
            { folder: "projects" },
            (error, result) => {
              if (error) {
                console.error('Cloudinary upload error:', error);
                reject(error);
              } else {
                resolve(result.secure_url);
              }
            }
          ).end(file.buffer);
        });
      })
    );

    // Delete old images from Cloudinary
    const oldImages = project.images || [];
    const imagesToDelete = oldImages.filter(image => !images.includes(image));

    for (const imageUrl of imagesToDelete) {
      const publicId = imageUrl.split('/').pop().split('.')[0]; // Extract public ID from the URL
      try {
        await cloudinary.v2.api
          .delete_resources(['projects/' + publicId],
            { type: 'upload', resource_type: 'image' })
      } catch (error) {
        console.log(`Failed to delete image ${imageUrl}:`, error.message);
      }
    }

    // Combine new and remaining old images
    const finalImages = [...oldImages.filter(image => images.includes(image)), ...photoUrls];

    // Update project details
    project.description = description;
    project.githubUrl = githubUrl;
    project.contributors = newContributorIDs;
    project.images = finalImages;

    const savedProject = await project.save();

    res.status(201).json({ message: 'Project updated successfully', project: savedProject });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error saving project', error: error.message });
  }
};
