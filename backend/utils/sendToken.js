export const sendToken = (res, user, message, statusCode = 200) => {
    // Get the token that now includes userProfile
    const token = user.getJWTToken();

    const options = {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
        httpOnly: true,
        secure: true, 
        sameSite: "none",
    };

    // Send the token and message in the response
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        message,
        token,  // The token contains the user profile now
    });
};
