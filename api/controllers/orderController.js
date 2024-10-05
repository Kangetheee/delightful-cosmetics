import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order for frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        const { userId, items, amount, address } = req.body;

        // Validate input data
        if (!userId || !items || items.length === 0 || !amount || !address) {
            return res.status(400).json({ success: false, message: "Invalid order data" });
        }

        // Create a new order
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
        });
        await newOrder.save();

        // Clear user's cart
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Prepare line items for Stripe
        const line_items = items.map((item) => ({
            price_data: {
                currency: "kes", // Consider making this dynamic if needed
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // Ensure this calculation is correct
            },
            quantity: item.quantity,
        }));

        // Add delivery charges
        const deliveryCharge = 2 * 100 ; // Define delivery charge
        line_items.push({
            price_data: {
                currency: "kes",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: deliveryCharge,
            },
            quantity: 1,
        });

        // Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Error processing your order" });
    }
};

const verifyOrder = async(req, res)=>{
    const {orderId, success} = req.body;
    try{
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            res.json({success:true, message:"Paid"})
        } else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false, message:"Not Paid"})
        }
    } catch(error){
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

const userOrders = async (req, res) => {
    try {
        const userId = req.body.userId; // Ensure userId is being passed from the frontend

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const orders = await orderModel.find({ userId });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ success: false, message: "No orders found for this user" });
        }

        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Error fetching orders" });
    }
};

// order control for admin
const listOrders = async(req, res)=>{
    try{
        const orders = await orderModel.find({});
        res.json({success:true, data:orders})
    } catch(error){
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

// const removeOrder = async (req, res) => {
//     try {
//         const { id } = req.body; // Ensure that the order ID is passed in the request body

//         // Validate input
//         if (!id) {
//             return res.status(400).json({ success: false, message: "Order ID is required" });
//         }

//         // Find and delete the order
//         const order = await orderModel.findByIdAndDelete(id);

//         // If the order doesn't exist
//         if (!order) {
//             return res.status(404).json({ success: false, message: "Order not found" });
//         }

//         res.json({ success: true, message: "Order removed successfully" });
//     } catch (error) {
//         console.error("Error removing order:", error);
//         res.status(500).json({ success: false, message: "Error removing order" });
//     }
// };



export { placeOrder, verifyOrder, userOrders, listOrders, removeOrder };