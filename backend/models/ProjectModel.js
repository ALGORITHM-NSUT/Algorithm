import mongoose from 'mongoose';
import CoreMember from './CoreMember.js';
import FormData from './formDataModel.js';
import apply from './joinProject.js';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lead: { type: mongoose.Schema.Types.ObjectId, ref: FormData, required: true },
  contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: FormData }],
  githubUrl: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, required: false },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: FormData }],
  images: [{ type: String, required: false }],
  liveLink: [{ type: String, required: false }]
});

const Project = mongoose.model('Project', projectSchema, 'ProjectCard');

export default Project;