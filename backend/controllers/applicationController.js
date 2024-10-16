import apply from "../models/joinProject.js";


export const submitapplication = async (req, res) => {
  const title = req.body.title;
  const lead = req.body.lead;
  const applier = req.user._id;
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


