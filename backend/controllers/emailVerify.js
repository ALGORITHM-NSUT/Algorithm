import FormData from "../models/formDataModel.js";

export const emailVerify = async (req, res) => {
    try {
        // Find user by ID
        let user = await FormData.findOne({ _id: req.params.id });
        
        if (!user) {
            return res.status(400).json({
                message: "Invalid Link"
            });
        }

        // Update verified status
        user.verified = true;
        await user.save(); // Save changes to the user document

    } catch (e) {
        console.error("Error verifying email:", e.message); // Log specific error
        res.status(500).json({
            message: "Internal Server Error",
            error: e.message // Optional: to help with debugging
        });
    }
};
