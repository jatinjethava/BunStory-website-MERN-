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



module.exports = {
    createUser,
    LoginUser
};