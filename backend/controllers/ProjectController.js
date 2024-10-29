import Project from "../models/ProjectModel.js";
import apply from "../models/joinProject.js"; // Make sure you have the right path

export const getProjects = async (req, res) => {
  try {
    const user = req.user._id;
    const projects = await Project.find()
      .populate('lead', 'name linkedinUrl')
      .populate('contributors', 'name linkedinUrl email')
      .populate({
        path: 'applications',
        populate: {
          path: 'applier',  // Populate the applier field to get names
          select: 'name linkedinUrl _id phoneNumber rollNumber githubProfile'     // Only select the name field
        }
      });

    // Fetch all applications from the apply model
    const applications = await apply.find().populate('applier', 'name linkedinUrl _id phoneNumber rollNumber githubProfile');

    // Iterate through each project and match applications based on the title
    const formattedProjects = projects.map(project => {
      const matchedApplications = applications.filter(app => app.title === project.title);

      return {
        title: project.title,
        lead: project.lead,
        contributors: project.contributors.map(contributor => ({
          name: contributor.name,
          linkedinUrl: contributor.linkedinUrl,
          email: contributor.email,
          rollNumber: contributor.rollNumber,
          phoneNumber: contributor.phoneNumber,
          githubProfile: contributor.githubProfile
        })),
        githubUrl: project.githubUrl,
        description: project.description,
        status: project.status === false ? "Ongoing" : "Completed",
        applicants: user == project.lead?._id ? matchedApplications.map(app => ({
          name: app.applier.name,
          linkedinUrl: app.applier.linkedinUrl,
          _id: app.applier._id,
          rollNumber: app.applier.rollNumber,
          phoneNumber: app.applier.phoneNumber,
          githubProfile: app.applier.githubProfile

        })) : []// Extract applicant names
      };
    });

    // Send back the formatted projects in JSON format
    res.status(200).json(formattedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
