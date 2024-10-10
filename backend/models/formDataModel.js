import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt, { hash } from "bcrypt"

const formDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: {type: String, required: true}
});


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