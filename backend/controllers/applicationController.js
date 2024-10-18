import application from "../models/joinProject.js";


export const submitapplication = async (req, res) => {
  const { title, lead } = req.body;
  const applier = req.user._id;
  console
  try {
    const apply = new application({
      title,
      lead,
      applier
    });

    const savedapplication = await apply.save();

    res.status(201).json({ message: 'Form data saved successfully', savedapplication });
  } catch (error) {
    res.status(500).json({ message: 'Error saving form data', error });
  }
};


