import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt, { hash } from "bcrypt"

const formDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // NSUT email, must be unique
    personalEmail: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    githubProfile: { type: String }, // Optional field
    leetcodeProfile: { type: String }, // Optional field
    codeforcesProfile: { type: String }, // Optional field
    password: { type: String, required: true }, // Store hashed password
}, { timestamps: true }); // Adds createdAt and updatedAt fields


formDataSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        return next()
    }
    const hashPassword = await bcrypt.hash(this.password, 10)
    this.password = hashPassword
    next()
})

formDataSchema.methods.getJWTToken = function (){
    return jwt.sign({_id:this._id}, process.env.JWT_SECRET,{
        expiresIn: "15d"
    })
}

formDataSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

const FormData = mongoose.model('FormData', formDataSchema, 'Algorithm_members');
export default FormData;