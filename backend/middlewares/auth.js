import jwt from "jsonwebtoken"
import FormData from "../models/formDataModel.js";


export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        req.user = {
            _id: ''
        }
        next();
    }
    else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded;
        next()
    }
}