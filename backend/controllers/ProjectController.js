import Project from "../models/ProjectModel.js";
import apply from "../models/joinProject.js";

export const getProjects = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch all projects with populated fields
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

    // Fetch all applications and populate the applier field
    const applications = await apply.find()
      .populate('applier', 'name linkedinUrl _id email phoneNumber rollNumber githubProfile');

    // Format projects and set the applicable field based on user applications
    const formattedProjects = projects.map(project => {
      // Check if the current user has applied to this project by title
      const hasUserApplied = applications.some(app =>
        app.title === project.title && String(app.applier._id) === String(userId)
      );

      // Set the applicable field based on the user's application status
      return {
        title: project.title,
        lead: project.lead,
        githubUrl: project.githubUrl,
        description: project.description,
        images: project.images,
        status: !project.status,
        applicable: !hasUserApplied, // true if user hasn't applied, false if they have
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

    // Send the formatted projects in JSON format
    res.status(200).json(formattedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
