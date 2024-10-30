import FormData from "../models/formDataModel.js";
import { sendToken } from "../utils/sendToken.js";
import CoreMember from "../models/CoreMember.js";
import { transporter } from "../utils/MailClient.js";


export const register = async (req, res) => {
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
        
        // Check if all required fields are provided
        if (!name || !email || !password) {
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

        // Create the new user, with admin status if applicable
        const isAdmin = !!Admin;
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
            admin: isAdmin,
            verified: false
        });

       

     
        const verificationLink = `${process.env.CLIENT_URL}/verify/${user.id}`;

        try {
            // Send verification email
            const info = await transporter.sendMail({
                from: '"Algorithm" <algorithmnsut@gmail.com>',
                to: email,
                subject: "Email Verification",
                text: `Please verify your email by clicking on the following link: ${verificationLink}`,
                html: `<p>Please verify your email by clicking on the following link:</p><a href="${verificationLink}">Verify Email</a>`,
            });

            console.log("Message sent: %s", info.messageId);
        } catch (emailError) {
            console.error("Error sending verification email:", emailError.message);
            return res.status(500).json({
                message: "Registration successful, but email verification failed",
                error: emailError.message,
            });
        }

        res.status(200).send({
            message: "success"
        })

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

        if(!user.verified){
            return res.status(401).json({
                message: "User Not Verified",
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
        const user = req.user._id;
        const member = await FormData.findOne({ _id: user });
        if (!member) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            member,
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

export const checkPassword = async (req, res) => {
    try {
        const user = req.user._id;
        const member = await FormData.findOne({ _id: user });
        const { password } = req.body;

        const isMatch = await member.comparePassword(password);

        if (!member || !isMatch) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            member,
        });
    } catch (error) {
        return next(
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            })
        );
    }
}

export const editProfile = async (req, res, next) => {
    try {
        const {
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
        } = req.body;

        // Check if all required fields are provided
        if (!name || !email) {
            return res.status(400).json({
                message: "Please provide all required fields",
            });
        }

        // Check if user exists with NSUT email
        let user = await FormData.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Overwrite user's information
        user.name = name;
        user.personalEmail = personalEmail || ""; // If not provided, set to empty string
        user.phoneNumber = phoneNumber || "";
        user.githubProfile = githubProfile || "";
        user.leetcodeProfile = leetcodeProfile || "";
        user.codeforcesProfile = codeforcesProfile || "";
        user.linkedinUrl = linkedinUrl || "";
        user.rollNumber = rollNumber || "";
        user.year = year || "";

        // Save the updated user
        await user.save();

        // Send token response after updating profile
        sendToken(res, user, "Account Edited successfully", 200);
    } catch (error) {
        return next(
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            })
        );
    }
};
