import bcrypt from 'bcrypt';
import FormData from "../models/formDataModel.js";

export const resetpass = async (req, res) => {
    try {
        const { password } = req.body;
        const token = req.params.id; // Extract the token from request parameters
        const user = await FormData.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: "Password reset token is invalid or has expired.",
            });
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).send({
            message: "Your password has been successfully reset.",
        });
        
    } catch (e) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: e.message,
        });
    }
};
