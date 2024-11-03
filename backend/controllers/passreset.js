import bcrypt from 'bcrypt';
import FormData from "../models/formDataModel.js";

export const resetpass = async (req, res) => {
    try {
        let user = await FormData.findOne({ _id: req.params.id });
        
        if (!user) {
            return res.status(400).json({
                message: "Invalid Link"
            });
        }

        user.verified = true;

        const { password } = req.body;

        user.password = password;
        await user.save(); 

        res.status(200).json({
            message: "Password updated successfully"
        });

    } catch (e) {
        console.error("Error updating password:", e.message); 
        res.status(500).json({
            message: "Internal Server Error",
            error: e.message 
        });
    }
};
