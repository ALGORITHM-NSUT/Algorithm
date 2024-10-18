import projectSchema from "../models/ProjectModel.js";

export const deleteProject = async (req, res) => {
  try {
    const user = req.user._id;
    const { title } = req.body;
    const project = await projectSchema.findOneAndDelete({ title: title, lead: user });
    if (!project) {
      res.status(401).json({ message: 'unauthorized' });
    }
    res.status(200).json({ message: 'Project Deleted successfully' });
  }
  catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
}