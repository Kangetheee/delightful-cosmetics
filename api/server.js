import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";


// App config
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB CONNECT
connectDB();

// API Endpoints
app.use("/api/product", productRouter); 
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)


app.get('/', (req, res) => {
    res.send("API IS WORKING");
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
