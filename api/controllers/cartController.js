import userModel from "../models/userModel.js";

// Add Items to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Fetch the user data
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Initialize cartData if it doesn't exist
        if (!userData.cartData) {
            userData.cartData = {};
        }

        // Add or update the item in the cart
        if (!userData.cartData[itemId]) {
            userData.cartData[itemId] = 1; // Add the item with a quantity of 1
        } else {
            userData.cartData[itemId] += 1; // Increment the quantity
        }

        // Save the updated user data
        await userData.save();
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

// Remove Items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData

        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        res.json({success:true, message:"Removed from cart"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

// Fetch user cart
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData
        res.json({success:true, cartData})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

export { addToCart, removeFromCart, getCart };
