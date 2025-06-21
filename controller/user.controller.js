import User from "../model/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All field are required",
    });
  } else if (password.length < 8) {
    return res.status(401).json({
      message: "Password should be minimum 8 Char",
    });
  }
  try {
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      return res.status(401).json({
        message: "User All-ready Exists",
      });
    }

    const user = await User.create({ name, email, password });
    if (!user) {
      return res.status(400).json({
        message: "User not Register",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.verificationToken = token;
    await user.save();

    // send email
    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_HOST_PORT,
      auth: {
        user: process.env.EMAIL_HOST_USER,
        pass: process.env.EMAIL_HOST_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_HOST_USER,
      to: user.email,
      subject: "Account Verification Token",
      html: `<div><p>click on below link to verify your account<p> <a>${process.env.ORG}/api/v1/users/verify/${token}</a></div>`, // HTML body
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({
      message: "user register successfully",
      success: true,
    });
  } catch (error) {
    return res.status(404).json({
      message: "All the field are required",
    });
  }
};

const verifyUser = async (req, res) => {
  // get token from url
  //validate
  // find user based on token
  //if not
  // set verification field to true
  // remove verification token
  // save
  //return Response
  const { token } = req.params;
  if (!token) {
    return res.status(404).json({
      message: "Empty token",
    });
  }
  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    return res.status(404).json({
      message: "Invalide User",
    });
  }
  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();
  return res.status(200).json({
    success: true,
    message: "user verified",
  });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and Password both required",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });
    const cookieOption = {
      httpOnly: true,
      //  secure: true, make this true only in prod
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "Strict",
    };
    res.cookie("token", token, cookieOption);
    res.status(200).json({
      message: "User Login Successfully",
      token,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong with Login",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie ("token", "", {});
    return res.status(200).json({
      message: "User Logout Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

const forgetPassword = async (req, res) => {
  //get email
  //find user based on email
  //reset token + reset expiry => Date.now()+10*60*1000
  //user.save
  //send mail=>design url
};

const resetPassword = async (req, res) => {
  //collect token from params
  //password from req,body
  const {token}=req.params
  const {password}=req.body
  try {
   const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {$gt: Date.now()}
    })
    // set password in user
    //resetToken,Reset Expiry
    //save
  } catch (error) {
    
  }
};

export {
  registerUser,
  verifyUser,
  userLogin,
  getUser,
  logout,
  forgetPassword,
  resetPassword,
};
