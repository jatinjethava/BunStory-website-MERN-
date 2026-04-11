const jwt = require("jsonwebtoken");
const USER = require("../Models/user");


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
};

const getAllUsers = async (req, res) => {
    try {
        const users = await USER.find({}).select('-password').sort({ createdAt: -1 });
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteUserByAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await USER.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    adminLogin,
    getAllUsers,
    deleteUserByAdmin
};
