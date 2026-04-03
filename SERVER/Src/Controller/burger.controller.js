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

const getAllBurger = async (req, res) => {
    try {
        const burger = await BURGER.find().sort({ createdAt: -1 });

        if (burger.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No burgers found"
            });
        }

        res.status(200).json({
            success: true,
            count: burger.length,
            data: burger
        });

    } catch (error) {
        console.error('Error creating burger:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const updateBurger = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, patty, bun, size, spice, toppings, sauces, price, calories } = req.body;

        if (!name || !description || !patty || !bun || !size || !spice || !price || !calories) {
            return res.status(400).json({
                success: false,
                message: "Required fields missing",
            });
        }

        const updatedBurger = await BURGER.findByIdAndUpdate(id, {
            name,
            description,
            patty,
            bun,
            size,
            spice,
            toppings,
            sauces,
            price,
            calories
        }, { returnDocument: "after", runValidators: true });

        if (!updatedBurger) {
            return res.status(404).json({
                success: false,
                message: "Burger not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Burger updated successfully",
            data: updatedBurger,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Something went wronge" });
    }
}

const getBurgerById = async (req, res) => {
    try {
        const { id } = req.params;

        const burger = await BURGER.findById(id);

        if (!burger) {
            return res.status(404).json({ success: false, message: "Not Any Burger Found." });
        }

        res.status(200)
            .json({
                success: true,
                message: "Burger Fetch Successfully",
                data: burger
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const deleteBurger = async (req, res) => {
    try {
        const { id } = req.params;

        const delBurger = await BURGER.findByIdAndDelete(id);

        if (!delBurger) {
            return res.status(404).json({ successs: false, message: "Borger Not Deleted" });
        }

        res.status(200).json({ success: true, message: "Burger Deleted Successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Something Went Wronge" });
    }
}

module.exports = {
    createBurger,
    getAllBurger,
    updateBurger,
    getBurgerById,
    deleteBurger
};