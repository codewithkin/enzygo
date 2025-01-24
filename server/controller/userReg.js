import bcrypt from "bcrypt";
import argon2 from "argon2";

import userModel from "../models/userModel.js";

const userReg = async (req, res) => {
    try {
        const { username, email, password} = req.body;
        // Validate email
        // check if username or email is in use
        const checkExists = userModel.findOne({ 
            $or : [{ username : username  } , 
                {email: email }]
            })

        // send a response if username or email is in use
        if (checkExists.username === username) {
            return res.status(409).json({
                status : 409,
                message : ` ${username} already in use, use another username`
            })
        } else if (checkExists.email === email) {
            return res.status(409).json({
                status : 409,
                message : ` ${email} already in use, use another email`
            })
        }
        // Hash password
        // const salt = await bcrypt.genSalt(process.env.SALT);
        // const hashedPassword = await bcrypt.hash(password, salt)

        const hashedPassword = await argon2.hash(password)

        // Create new user
        const newUser = new userModel({
            username,
            email,
            password : hashedPassword
        })

        // Save user to database
        await newUser.save()

        res.status(201).json({
            status : 201,
            message : 'User Created Successfully',
            data : newUser
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ Message : "Server Error please try again later" })
    }
}

export default userReg;