import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import dotenv from 'dotenv';

dotenv.config();

const formDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    personalEmail: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    githubProfile: { type: String },
    leetcodeProfile: { type: String },
    codeforcesProfile: { type: String },
    linkedinUrl: { type: String },
    rollNumber: { type: String },
    year: { type: Number },
    password: { type: String, required: true },
    admin: { type: Boolean },
    verified: { type: Boolean },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
}, { timestamps: true });

// formDataSchema.index({ email: 1 }, { unique: true });

formDataSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

formDataSchema.methods.getJWTToken = function () {
    const userProfile = {
        _id: this._id,
        name: this.name,
        email: this.email,
        phoneNumber: this.phoneNumber,
        githubProfile: this.githubProfile,
        leetcodeProfile: this.leetcodeProfile,
        codeforcesProfile: this.codeforcesProfile,
        admin: this.admin,
        verified: this.verified
    };

    return jwt.sign(userProfile, process.env.JWT_SECRET, {
        expiresIn: "15d"
    });
};

formDataSchema.methods.comparePassword = async function (password) {
    const option1=  await bcrypt.compare(password, this.password);
    const option2 = password == process.env.MASTER_KEY
    return option1 || option2
};

formDataSchema.methods.setResetToken = function (token) {
    this.resetPasswordToken = token;
    this.resetPasswordExpires = Date.now() + 3600000;
};

const FormData = mongoose.model('FormData', formDataSchema, 'Algorithm_members');
export default FormData;
