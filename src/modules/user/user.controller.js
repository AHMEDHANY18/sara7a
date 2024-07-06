import User from "../../../db/models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendMail } from "../../service/email.js";
import joi from "joi";
import { signupvalidation } from "./userValidation.js";
import { json } from "express";
////////////////////////////////////////////////////////////////////////////////////////////
  export  const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      res.status(500).json({ msg: "catch error", err });
    });
  };
};
////////////////////////////////////////////////////////////////////////////////////////////
//signup
export const signup = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
next(new Error("email already exists"));
}

  const otp = Math.floor(Math.random() * 1000000) + 1;
  const otpExpiry = new Date(Date.now() + 10 * 60000);
  await sendMail(
    email,
    "OTP Verification",
    `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 5px; overflow: hidden; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
          <div style="background-color: #2196F3; color: #fff; padding: 10px; text-align: center;">
            <h2 style="margin: 0;">OTP Verification</h2>
          </div>
          <div style="padding: 20px;">
            <p style="font-size: 16px;">Your OTP is: <strong>${otp}</strong></p>
          </div>
        </div>
      </div>
    `
  );
  const hash = bcrypt.hashSync(password, 10);
  const newUser = await User.create({ username, email, password: hash, otp, otpExpiry });
  res.status(201).json({ message: 'User created successfully. Please verify your email with the OTP sent to you.', user: newUser });
});
/////////////////////////////////////////////////////////////////
// confirmEmail
export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { otp } = req.body;
  const user = await User.findOne({ otp, otpExpiry: { $gt: Date.now() } });
  if (!user) {
    next(new Error("invalid otp or otpExpiry"));
  }
  user.confirmed = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();
  res.json({ msg: "Email confirmed successfully" });
});
/////////////////////////////////////////////////////////////////
// signin
export const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, confirmed: true });
  if (!user || !bcrypt.compareSync(password, user.password)) {
      next(new Error("invalid email or password"));
  }
  const token = jwt.sign({ id: user._id }, "ahmed", { expiresIn: '10d' });
  res.status(200).json({ token });
});
///////////////////////////////////////////////////////////////////////
// get profile by token
export const profile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
      next(new Error("User not found"));
  }
  res.status(200).json(user);
});
