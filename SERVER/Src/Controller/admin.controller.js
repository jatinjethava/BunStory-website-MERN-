require("dotenv").config();
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json({ success: false, message: "Email And Password Are Required" });
        }

        const Admin_email = process.env.ADMIN_EMAIL
        const Admin_password = process.env.ADMIN_PASSWORD

        if (email !== Admin_email || password !== Admin_password) {
            return res.status(404).json({ success: false, message: "Only Admin Can Access" });
        }

        const token = jwt.sign({ email }, process.env.SECRET_KEY, {
            expiresIn: "10h"
        })

        return res.status(200).json({
            success: true,
            message: "Login Successfully",
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something Went Wrong" });
    }
}

module.exports = adminLogin;