import Project from "../models/ProjectModel.js";
import apply from "../models/joinProject.js";
import FormData from "../models/formDataModel.js";
import { Octokit } from "@octokit/rest";
import cloudinary from 'cloudinary';

const uploadFilesToCloudinary = async (files, folder = "projects") => {
  return Promise.all(
    files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream(
          { folder },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          }
        ).end(file.buffer);
      });
    })
  );
};

const deteFromCloudinary = async (imagesToDelete) => {
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
}

export const getProjects = async (req, res) => {
  try {
    const userId = req.user._id;
    const projects = await Project.find()
      .populate('lead', 'name linkedinUrl email phoneNumber rollNumber githubProfile')
      .populate('contributors', 'name linkedinUrl email phoneNumber rollNumber githubProfile')
      .populate({
        path: 'applications',
        populate: {
          path: 'applier',
          select: 'name linkedinUrl email phoneNumber rollNumber githubProfile'
        }
      });
    const applications = await apply.find()
      .populate('applier', 'name linkedinUrl _id email phoneNumber rollNumber githubProfile');
    const formattedProjects = projects.map(project => {
      const hasUserApplied = applications.some(app =>
        app.title === project.title && String(app.applier._id) === String(userId)
      );
      return {
        title: project.title,
        lead: project.lead,
        githubUrl: project.githubUrl,
        description: project.description,
        images: project.images,
        status: project.status,
        liveLink: project.liveLink,
        applicable: !hasUserApplied,
        contributors: project.contributors.map(contributor => ({
          name: contributor.name,
          linkedinUrl: contributor.linkedinUrl,
          email: contributor.email,
          rollNumber: contributor.rollNumber,
          phoneNumber: contributor.phoneNumber,
          githubProfile: contributor.githubProfile
        })),
        applicants: String(userId) === String(project.lead._id)
          ? applications
            .filter(app => app.title === project.title)
            .map(app => ({
              name: app.applier.name,
              linkedinUrl: app.applier.linkedinUrl,
              _id: app.applier._id,
              email: app.applier.email,
              rollNumber: app.applier.rollNumber,
              phoneNumber: app.applier.phoneNumber,
              githubProfile: app.applier.githubProfile
            }))
          : []
      };
    });
    res.status(200).json(formattedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProject = async (req, res) => {
  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    cloudinary.v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API,
      api_secret: process.env.CLOUDINARY_SECRET,
      secure: true,
    });
    const { title, description, lead, contributors, githubUrl, images, liveLink, status } = req.body;
    const uploadImages = req.files;
    if (req.user._id === '') {
      return res.status(403).json({ message: 'Session Expired, Login again!' });
    }
    const project = await Project.findOne({ title: title });
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
    let photoUrls;
    try {
      photoUrls = await uploadFilesToCloudinary(uploadImages);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to upload images', error: error.message });
    }
    const oldImages = project.images || [];
    const imagesToDelete = oldImages.filter(image => !images.includes(image));
    await deteFromCloudinary(imagesToDelete);
    const finalImages = [...oldImages.filter(image => images.includes(image)), ...photoUrls];
    project.description = description;
    project.githubUrl = githubUrl;
    project.contributors = newContributorIDs;
    project.images = finalImages;
    project.status = status;
    project.liveLink = liveLink;
    const savedProject = await project.save();
    res.status(200).json({ message: 'Project updated successfully', project: savedProject });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error saving project', error: error.message });
  }
};




export const addProject = async (req, res) => {
  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    cloudinary.v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API,
      api_secret: process.env.CLOUDINARY_SECRET,
      secure: true,
    });
    const { title, description, lead, githubUrl, liveLink } = req.body;
    const images = req.files;
    const admin = req.user.admin;
    if (req.user._id === '') {
      return res.status(403).json({ message: 'Session Expired, Login again!' });
    }
    if (!admin) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!title || !description || !lead) {
      return res.status(406).json({ message: 'Check title, description, and lead' });
    }
    const leadUser = await FormData.findOne({ email: lead });
    if (!leadUser) {
      return res.status(404).json({ message: 'Lead user not found' });
    }
    const [owner, repo] = githubUrl.split('/').slice(-2);
    if (owner !== "ALGORITHM-NSUT") {
      return res.status(422).json({ message: 'URL outside organization' });
    }
    try {
      await octokit.rest.repos.get({ owner, repo });
    } catch (error) {
      if (error.status === 404) {
        return res.status(404).json({ message: 'Repository does not exist.', error: error.message });
      } else {
        return res.status(500).json({ message: 'Error verifying repository', error: error.message });
      }
    }
    let photoUrls;
    try {
      photoUrls = await uploadFilesToCloudinary(images);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to upload images', error: error.message });
    }
    const newProject = new Project({
      title,
      description,
      lead: leadUser._id,
      contributors: [],
      githubUrl,
      images: photoUrls,
      liveLink
    });
    const savedProject = await newProject.save();
    res.status(201).json({ message: 'Project saved successfully', project: savedProject });
  } catch (error) {
    console.error('Error saving project:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};




export const deleteProject = async (req, res) => {
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API,
      api_secret: process.env.CLOUDINARY_SECRET,
      secure: true,
    });
    const user = req.user._id;
    if (user === '') {
      return res.status(403).json({ message: 'Session Expired, Login again!' });
    }
    const { title } = req.body;
    const project = await Project.findOne({ title: title, lead: user });
    if (!project) {
      res.status(401).json({ message: 'unauthorized' });
    }
    await deteFromCloudinary(project.images);
    await Project.deleteOne({ _id: project._id });
    res.status(200).json({ message: 'Project Deleted successfully' });
  }
  catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
}
