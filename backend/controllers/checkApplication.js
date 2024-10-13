import apply from "../models/joinProject.js";

export const checkapplication = async (req, res) => {
  const { title, lead, applier } = req.body;

  try {
    // Search for the document
    const existingApp = await apply.findOne({ title, applier });

    if (existingApp) {
      // If found, respond accordingly
      return res.status(200).json({ message: 'Application already exists', existingApp });
    }
    res.status(200).json({ message: 'Application does not exist' });
  }
  catch (error) {
    res.status(500).json({ message: 'Error checking applications', error });
  }
};