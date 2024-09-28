import express from "express"
import { addProduct } from "../controllers/productController";
import multer from "multer";

const productRouter = express.Router();

// image storafe enine
const storage = multer.diskStorage({
    destination: "uploads",
    filename:(req, file, cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

productRouter.post("/add", upload.single("image"), addProduct)

export default ProductRouter;