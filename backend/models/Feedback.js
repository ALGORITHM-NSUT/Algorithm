import mongoose from 'mongoose';
import FormData from './formDataModel.js';


const feedbackmodel = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: FormData, default: null },
  performanceRating: { type: Number},
  uiRating: { type: Number},
  feedback: { type: String }
});
const Feedback = mongoose.model('Feedback', feedbackmodel, 'Feedbacks');

export default Feedback;