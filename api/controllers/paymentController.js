import axios from 'axios';
import moment from 'moment'; // For generating the timestamp
import { generateAccessToken } from './authController'; // Assuming you have an authController.js for token generation

export const initiatePayment = async (req, res) => {
    const { address, items, amount, phoneNumber } = req.body;

    // Set up M-Pesa API details
    const M_PESA_API_URL = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

    try {
        // Step 1: Get access token
        const accessToken = await generateAccessToken();
        
        // Step 2: Generate the timestamp and password
        const timestamp = moment().format('YYYYMMDDHHmmss');  // Generates the timestamp in required format
        const password = Buffer.from(
            `${process.env.BUSINESS_SHORT_CODE}${process.env.PASSKEY}${timestamp}`
        ).toString('base64');

        // Step 3: Create payload for M-Pesa request
        const payload = {
            "BusinessShortCode": process.env.BUSINESS_SHORT_CODE,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,  // The amount to charge
            "PartyA": phoneNumber,  // The phone number making the payment
            "PartyB": process.env.BUSINESS_SHORT_CODE,  // Your business short code
            "PhoneNumber": phoneNumber,  // The phone number paying
            "CallBackURL": process.env.CALLBACK_URL,  // Your callback URL
            "AccountReference": "Order12345",  // A reference for the payment
            "TransactionDesc": "Payment for order"
        };

        // Step 4: Send the STK push request
        const response = await axios.post(M_PESA_API_URL, payload, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });

        // Step 5: Return the response to the client
        return res.json({ success: true, data: response.data });
        
    } catch (error) {
        // Log and handle errors
        console.error("Error initiating M-Pesa payment:", error.response ? error.response.data : error.message);
        return res.status(500).json({
            success: false,
            message: "Error processing payment",
            error: error.response ? error.response.data : error.message
        });
    }
};
