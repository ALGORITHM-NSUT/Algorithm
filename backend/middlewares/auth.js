import jwt from "jsonwebtoken"
import FormData from "../models/formDataModel.js";


export const isAuthenticated = async (req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.json({
            message: "Not logged in"
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await FormData.findById(decoded._id)

    next()
}