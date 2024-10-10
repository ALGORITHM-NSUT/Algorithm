import FormData from "../models/formDataModel.js"
import { sendToken } from "../utils/sendToken.js"


export const register = async(req,res,next)=>{
    const {name, email, password} = req.body

    // check if all are there 

    let user = await FormData.findOne({email})

    if(user){
        return next(res.status(401).json({
            message: "User Already Exists"
        }))
    }

    user = await FormData.create({
        name,
        email,
        password
    });

    sendToken(res,user,"Registerd successfully", 201)

}



export const login = async(req,res,next)=>{
    const { email, password} = req.body

    // check if all are there 

    const user = await FormData.findOne({email})

    if(!user){
        return next(res.status(401).json({
            message: "Incorrect Email or Password"
        }))
    }

    const isMatch = await user.comparePassword(password);
    
     if(!isMatch){
        return next(res.status(401).json({
            message: "Incorrect Email or Password"
        }))
    }

    sendToken(res,user,"Login successfully", 200)

}



export const logout = async (req,res,next)=>{

    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
    })
    .json({
        success: true,
        message: "Logged out successfully"
    })
}