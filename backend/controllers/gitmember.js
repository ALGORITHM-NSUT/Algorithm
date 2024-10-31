import FormData from "../models/formDataModel.js";

export const gitmember = async (req, res) => {
  try {
    req.user._id
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const org = "ALGORITHM-NSUT"
    const user = await FormData.findOne({ _id: req.user._id });
    const username = user.githubProfile || req.body.username;
    try {
      await octokit.rest.orgs.getMembershipForUser({
        org,
        username: githubProfile.split('/').pop()
      });
    } catch (error) {
      if (error.status === 404) {
        try {
          const response = await octokit.rest.orgs.createInvitation({
            org,
            invitee_id: githubProfile.split('/').pop()
          });
        } catch (inviteError) {
          return res.status(422).json({
            message: "invalid GitHub ID",
            error: error.message,
          });
          console.error(`Failed to send invitation: ${inviteError.message}`);
        }
      }
    }
  }
  catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
}