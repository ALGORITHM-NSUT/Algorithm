export const sendToken = (res, user, message, statusCode = 200) => {
    const token = user.getJWTToken();

    // Define cookie options
    const options = {
        // expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // Cookie expiration (15 days)
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true, // Ensure cookie is not accessible via JavaScript
        secure: true, // Send cookie over HTTPS only (for production)
        sameSite: "none", // Allow cross-site cookie usage
    };

    // Remove sensitive fields like password from the user object
    const userProfile = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        githubProfile: user.githubProfile,
        leetcodeProfile: user.leetcodeProfile,
        codeforcesProfile: user.codeforcesProfile,
        linkedinUrl: user.linkedinUrl,
        rollNumber: user.rollNumber,
        personalEmail: user.personalEmail,
        year: user.year,
        admin: user.admin
        // Add any other fields you want to send, like profile picture, role, etc.
    };

    // Send token and filtered user data
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        message,
        token,  // Send the token separately for storage in session storage
        user: userProfile,  // Send the filtered user profile
    });
};