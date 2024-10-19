import FormData from "../models/formDataModel.js";
import { sendToken } from "../utils/sendToken.js";
import CoreMember from "../models/CoreMember.js";

export const register = async (req, res, next) => {
    try {
        const {
            name,
            email,
            personalEmail,
            phoneNumber,
            githubProfile,
            leetcodeProfile,
            codeforcesProfile,
            password,
            linkedinUrl,
            rollNumber,
            year
        } = req.body;
        console.log(name,
            email,
            personalEmail,
            phoneNumber,
            githubProfile,
            leetcodeProfile,
            codeforcesProfile,
            password,
            linkedinUrl,
            rollNumber,
            year);
        // Check if all required fields are provided
        if (
            !name ||
            !email ||
            !password
        ) {
            return res.status(400).json({
                message: "Please provide all required fields",
            });
        }

        // Check if user already exists with NSUT email
        let user = await FormData.findOne({ email });
        const Admin = await CoreMember.findOne({ email });

        if (user) {
            return res.status(401).json({
                message: "User with this NSUT Email Already Exists",
            });
        }

        if (Admin) {
            const admin = true;
            user = await FormData.create({
                name,
                email,
                personalEmail,
                phoneNumber,
                githubProfile,
                leetcodeProfile,
                codeforcesProfile,
                linkedinUrl,
                rollNumber,
                year,
                password,
                admin
            });
        }
        else {
            user = await FormData.create({
                name,
                email,
                personalEmail,
                phoneNumber,
                githubProfile,
                leetcodeProfile,
                codeforcesProfile,
                linkedinUrl,
                rollNumber,
                year,
                password,
            });
        }

        // Send token response after registration
        sendToken(res, user, "Registered successfully", 201);
    } catch (error) {
        return next(
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            })
        );
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if both email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide both email and password",
            });
        }

        // Find user by email
        const user = await FormData.findOne({ email });
        // console.log(user);

        if (!user) {
            return res.status(401).json({
                message: "Incorrect Email or Password",
            });
        }

        // Check if the password matches
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Incorrect Email or Password",
            });
        }

        // Send token response
        sendToken(res, user, "Login successful", 200);
    } catch (error) {
        return next(
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            })
        );
    }
};

export const logout = async (req, res, next) => {
    try {
        res
            .status(200)
            .cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly: true,
            })
            .json({
                success: true,
                message: "Logged out successfully",
            });
    } catch (error) {
        return next(
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            })
        );
    }
};

export const getMyProfile = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        return next(
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            })
        );
    }
};
