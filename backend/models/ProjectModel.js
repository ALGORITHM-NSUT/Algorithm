import mongoose from 'mongoose';
import CoreMember from './CoreMember.js';
import FormData from './formDataModel.js';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lead: { type: mongoose.Schema.Types.ObjectId, ref: CoreMember, required: true },
  contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: FormData }],
  githubUrl: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, required: false }
});

const Project = mongoose.model('Project', projectSchema, 'ProjectCard');

export default Project;