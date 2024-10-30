import mongoose from 'mongoose';
import CoreMember from './CoreMember.js';
import FormData from './formDataModel.js';


const application = new mongoose.Schema({
  title: { type: String, required: true },
  lead: { type: mongoose.Schema.Types.ObjectId, ref: FormData, required: true },
  applier: { type: mongoose.Schema.Types.ObjectId, ref: FormData, required: true }
});
application.index({ title: 1, applier: 1 }, { unique: true });
const apply = mongoose.model('Join_requests', application, 'Join_requests');

export default apply;