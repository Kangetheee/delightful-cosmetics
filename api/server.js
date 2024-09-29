import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import productRouter from "./routes/productRoute.js"

// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

// DB CONNECT
connectDB()

// api endpoints
app.use("/api/product, productRouter")



app.get('/', (req, res)=>{
    res.send("API IS WORKING")
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})
