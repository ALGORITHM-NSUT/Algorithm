import mongoose from 'mongoose';

const contributorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  linkedinUrl: { type: String, required: true },
});

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  linkedinUrl: { type: String, required: true },
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lead: leadSchema,
  contributors: [contributorSchema],
  githubUrl: { type: String, required: true },
  description: { type: String, required: true },
});

const Project = mongoose.model('Project', projectSchema, 'ProjectCard');

export default Project;