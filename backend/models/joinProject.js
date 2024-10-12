import mongoose from 'mongoose';
import CoreMember from './CoreMember.js';
import FormData from './formDataModel.js';


const application = new mongoose.Schema({
  title: { type: String, required: true },
  lead: { type: String, required: true },
  applier: { type: String, required: true }
});

const apply = mongoose.model('apply', application, 'application');

export default apply;