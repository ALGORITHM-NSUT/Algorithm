import FormData from '../models/formDataModel.js';

export const submitFormData = async (req, res) => {
    const { name, nsutEmail, personalEmail, phoneNumber, githubProfile, leetCodeProfile, codeforcesProfile } = req.body;

    try {
        const formData = new FormData({
            name,
            nsutEmail,
            personalEmail,
            phoneNumber,
            githubProfile,
            leetCodeProfile,
            codeforcesProfile
        });

        await formData.save();
        
        res.status(201).json({ message: 'Form data saved successfully', formData });
    } catch (error) {
        res.status(500).json({ message: 'Error saving form data', error });
    }
};


