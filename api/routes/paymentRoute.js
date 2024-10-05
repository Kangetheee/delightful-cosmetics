// routes/paymentRoute.js

import express from 'express';
import { initiatePayment } from '../controllers/paymentController.js'; 
import authMiddleware from '../middleware/auth.js';

const paymentRouter = express.Router();

// Endpoint to initiate M-Pesa payment
paymentRouter.post('/initiate',authMiddleware , initiatePayment);

export default paymentRouter;
