const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { get } = require("mongoose");


 const getUser = async (req, res)=>{
    console.log("ran");

    const users = await User.find();
    res.status(200).json(users)
 }


 const signup = async (req, res)=>{
    const {email,password}= req.body;
    console.log(req)
    const  hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role: "User"});
    await user.save();
    res.status(200).json(user);
 }

 const login = async (req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({   email});
    if(!user) return res.status(400).json({message: "User not found"});
    const isPasswordVaild = await bcrypt.compare(password, user.password);
    if(!isPasswordVaild) return res.status(400).json({message: "Invalid password"});
    const token = jwt.sign(
    {userId: user._id, role: user.role},
    process.env.SECRET_KEY, 
    {
        expiresIn: "1h",
    }
);
    res.json({token});
 };


 const getUserById = async (req, res)=>{
    console.log(req.params);
    const  {id} = req.params;


    const user = await User.findById(id);
    console.log(user);
    res.status(200).json(user);
 };

 module.exports = {getUser, signup, login, getUserById};