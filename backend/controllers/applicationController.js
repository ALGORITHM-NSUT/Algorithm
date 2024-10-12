import apply from "../models/joinProject.js";

export const submitapplication = async (req, res) => {
  const { title, lead, applier } = req.body;

  try {
    const appData = new apply({
      title,
      lead,
      applier
    });

    await appData.save();

    res.status(201).json({ message: 'Form data saved successfully', appData });
  } catch (error) {
    res.status(500).json({ message: 'Error saving form data', error });
  }
};


