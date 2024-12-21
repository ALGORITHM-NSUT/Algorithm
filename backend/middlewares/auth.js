import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        req.user = {
            _id: ''
        };
        return next(); // Ensure you stop execution here
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next(); // Proceed to the next middleware
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            }); // Clear the cookie before sending a response
            return res.status(401).json({ message: 'Token expired' }); // Use `return` to stop further execution
        } else {
            return res.status(403).json({ message: 'Invalid token' }); // Use `return` here as well
        }
    }
};
