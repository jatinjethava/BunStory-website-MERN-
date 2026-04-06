const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        // console.log('Received token:', token);
        if (!token) {
            return res.status(401).json({ success: false, message: "Token not provided." });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);

        if (!decode) {
            return res.status(401).json({ success: false, message: "Invalid Token." });
        }

        req.adminId = decode.email;
        next();

    } catch (error) {
        console.error('Authentication error:', error.message);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: "Invalid or malformed token." });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Token has expired. Please login again." });
        }
        
        res.status(401).json({ success: false, message: "Authentication failed." });
    }
}

module.exports = adminAuth;