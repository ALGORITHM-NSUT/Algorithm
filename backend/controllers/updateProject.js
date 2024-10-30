import projectSchema from "../models/ProjectModel.js";
import FormData from "../models/formDataModel.js";
import { Octokit } from "@octokit/rest";
import cloudinary from 'cloudinary';

export const updateProject = async (req, res) => {
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API,
      api_secret: process.env.CLOUDINARY_SECRET,
      secure: true,
    });

    const { title, description, lead, contributors, githubUrl, images } = req.body;
    const uploadImages = req.files;

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
    var contributorList;
    var contributorIDs = project.contributors;
    if (contributors != '') {
      if (typeof contributors === 'string') {
        contributorList = [contributors];
      }
      else {
        contributorList = contributors;
      }
      const contributorEmails = contributorList;
      const foundContributors = await FormData.find({ email: { $in: contributorEmails } });

      if (foundContributors.length !== contributorEmails.length) {
        return res.status(404).json({ message: 'Some contributors not found' });
      }

      contributorIDs = foundContributors.map(contributor => contributor._id.toString());
      const contributorGitProfiles = foundContributors.map(contributor => contributor.githubProfile.split('/').pop());

      const previousContributorIDs = project.contributors.map(contributor => contributor.toString());
      const removedContributorIDs = previousContributorIDs.filter(id => !contributorIDs.includes(id));

      const removedContributors = await FormData.find({ _id: { $in: removedContributorIDs } });
      const removedContributorGitProfiles = removedContributors.map(contributor => contributor.githubProfile);
      // GitHub API instance
      if (removedContributorGitProfiles.length != 0) {
        const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
        const [owner, repo] = githubUrl.split('/').slice(-2);

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
      }

    }

    const photoUrls = await Promise.all(
      uploadImages.map(file => {
        console.log('Uploading file:', file.originalname);
        return new Promise((resolve, reject) => {
          cloudinary.v2.uploader.upload_stream(
            { folder: "projects" },
            (error, result) => {
              if (error) {
                console.error('Cloudinary upload error:', error);
                reject(error);
              } else {
                console.log('Uploaded:', result.secure_url);
                resolve(result.secure_url);
              }
            }
          ).end(file.buffer);
        });
      })
    );

    // Delete old images from Cloudinary
    const oldImages = project.images || [];
    const imagesToDelete = oldImages.filter(image => !images.includes(image)); // Identify images to delete

    for (const imageUrl of imagesToDelete) {
      const publicId = imageUrl.split('/').pop().split('.')[0]; // Extract public ID from the URL
      try {
        await cloudinary.v2.uploader.destroy(publicId); // Delete image from Cloudinary
      } catch (error) {
        console.log(`Failed to delete image ${imageUrl}:`, error.message);
      }
    }

    // Combine new and remaining old images
    const finalImages = [...oldImages.filter(image => images.includes(image)), ...photoUrls];

    // Update project details
    project.description = description;
    project.githubUrl = githubUrl;
    project.contributors = contributorIDs;
    project.images = finalImages; // Update to the new images

    const savedProject = await project.save();

    res.status(201).json({ message: 'Project updated successfully', project: savedProject });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error saving project', error: error.message });
  }
};
