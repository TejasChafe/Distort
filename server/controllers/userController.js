import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// import nodemailer from 'nodemailer'

const registerUser = async(req, res)=>{
    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 587,
    //     secure: false,
    //     auth:{
    //         user: process.env.EMAIL_USER,
    //         pass: process.env.EMAIL_PASS
    //     }
    // })
    try{
        const{name, email, password} = req.body;
        if(!name || !email || !password){
            return res.json({success:false, message:'Missing Details'})
        }
        const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

        if (!strongPasswordRegex.test(password)) {
            return res.json({
                success: false,
                message: 'Password must be at least 8 characters long and include one uppercase letter, one number, and one special character'
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPwd = await bcrypt.hash(password, salt)
        const userData = {
            name, email, password:hashedPwd
        }
        
        const newUser = new userModel(userData)
        const user = await newUser.save()
        
        // const mailOptions = {
        //     from: process.env.EMAIL_USER,
        //     to: email,
        //     subject: 'Successfully registered',
        //     html: `<p>Hello ${name},</p>
        //            <p>Thank you for registering!</p>`          
        // };
        // transporter.verify((error, success) => {
        //     if (error) {
        //       console.log('Email transporter error:', error)
        //     } else {
        //       console.log('Email transporter is ready', success)
        //     }
        //   })
          
        // await transporter.sendMail(mailOptions);

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
        res.json({success:true, token, user: {name:user.name}})
    }
    catch(error){
        // if (error.code === 11000) {
        //     return res.json({ success: false, message: 'User already exists' });
        // }
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

const loginUser = async(req, res) =>{
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false, message:'User does not exist'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            return res.json({success:true, token, user:{name:user.name, _id:user._id}})
        }
        else{
            return res.json({success:false, message:'Invalid Credentials'})
        }
    }
    catch(error){
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

export {registerUser, loginUser} 