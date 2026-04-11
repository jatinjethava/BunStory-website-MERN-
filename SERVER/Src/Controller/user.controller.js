const USER = require('../Models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new user
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await USER.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new USER({
            name,
            email,
            password: hashPassword
        });
        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id },
            process.env.SECRET_KEY,
            { expiresIn: '10h' }
        );

        res.status(201)
            .json({
                message: 'User created successfully',
                token,
                user: {
                    newUser
                }
            });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await USER.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: '10h' }
        );

        res.status(200)
            .json({
                message: 'Login successful',
                token,
                user: {
                    user,
                }
            });

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



const getProfile = async (req, res) => {
    try {
        const userId = req.user;
        const user = await USER.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user;
        const { name, email, password } = req.body;
        const updateData = { name };
        if (email) {
            const existingUser = await USER.findOne({ email, _id: { $ne: userId } });
            if (existingUser) {
                return res.status(400).json({ success: false, message: "Email already in use" });
            }
            updateData.email = email;
        }
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }
        const updatedUser = await USER.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.user;
        await USER.findByIdAndDelete(userId);
        res.status(200).json({ success: true, message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createUser,
    LoginUser,
    getProfile,
    updateProfile,
    deleteUser
};
