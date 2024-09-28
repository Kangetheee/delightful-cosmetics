import mongoose from "mongoose"

export const connectDB = async() => {
    await mongoose.connect('mongodb://Kangethe:user123@cluster0-shard-00-00.qwzv2.mongodb.net:27017,cluster0-shard-00-01.qwzv2.mongodb.net:27017/delightful-cosmetics?ssl=true&replicaSet=atlas-bh5ple-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0').then(() => console.log("DB Connected")
    )
}




