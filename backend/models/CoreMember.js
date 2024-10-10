import mongoose from 'mongoose';

const coreMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  imageUrl: { type: String, required: true },
  linkedinUrl: { type: String, required: true },
  order: { type: Number },
  subPosition: { type: String } // Optional field
});
const CoreMember = mongoose.model('Core_members', coreMemberSchema, 'Core_members');
export default CoreMember;
