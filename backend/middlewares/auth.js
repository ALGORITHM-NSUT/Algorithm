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
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded;
            next()
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                // Token has expired
                return res.status(401).json({ message: 'Token expired' }).clearCookie("token", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none"
                });
            } else {
                // Invalid token or other errors
                return res.status(403).json({ message: 'Invalid token' });
            }
        }
    }
}