import mongoose from "mongoose";

const formDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nsutEmail: { type: String, required: true },
    personalEmail: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    githubProfile: { type: String },
    leetCodeProfile: { type: String },
    codeforcesProfile: { type: String }
});

const FormData = mongoose.model('FormData', formDataSchema, 'Algorithm_members');
export default FormData;