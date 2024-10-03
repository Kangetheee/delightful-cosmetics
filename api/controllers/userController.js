import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import validator from "validator"

const loginUser = async (req, res) =>{
    const { email, password } = req.body;
    try{
        const user = await userModel.findOne({email});
        // user existence
        if(!user){
            return res.json({success:false, message:"User Doesn't Exist"})
        }
        // password comparison
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false, message:"Invalid Credentials"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})

    } catch(error){
        console.log(error)
        res.json({success:false, message:"Error"})

    }
}
// token ID
const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const registerUser = async (req, res) =>{
    const { name, password, email } = req.body;
    try{
        // user existence
        const exists = await userModel.findOne({email})
        if (exists){
            return res.json({success:false, message:"User Exists."})
        }
        // email format validity
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter Valid Email."})
        }
        // pass length
        if(password.length<8){
            return res.json({success:false, message:"Please enter a Stronger Password"})
        }
        // Hashing Passwords
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        const newUser = new userModel({
            name:name,
            email,email,
            password,hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch(error){
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

export {loginUser, registerUser}