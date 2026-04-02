const BURGER = require('../Models/burger');

// Create a new burger

const createBurger = async (req, res) => {
    try {
        const { name, description, patty, bun, size, spice, toppings, sauces, price, calories } = req.body;
        if (!name || !description || !patty || !bun || !price) {
            return res.status(400).json({ message: 'Name, description, patty, bun and price are required' });
        }

        const newBurger = new BURGER({
            name,
            description,
            patty,
            bun,
            size,
            spice,
            toppings,
            sauces,
            price,
            calories,
        });
        await newBurger.save();

        res.status(201)
            .json({
                message: 'Burger created successfully',
                burger: newBurger
            });

    } catch (error) {
        console.error('Error creating burger:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



module.exports = {
    createBurger,
};