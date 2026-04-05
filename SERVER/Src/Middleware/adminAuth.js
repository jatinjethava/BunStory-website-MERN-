const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        // console.log('Received token:', token);
        if (!token) {
            return res.status(401).json({ success: false, message: "token not provided." });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);

        if (!decode) {
            return res.status(401).json({ success: false, message: "Invalid Token." });
        }

        req.adminId = decode.adminId;
        next();

    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = adminAuth;