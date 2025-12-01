
const express = require('express');
require ("dotenv").config();
const mongoose = require("mongoose");
// const User = require("./models/User");
// const Post= require ("./models/Post");
// const Comment =require("./models/Comment")
// const Review = require("./models/Review");
const cors = require("cors");
// const Product = require("./models/Products");




const app = express();
const PORT=2468;



mongoose
// .connect("mongodb://localhost:27017/myfirstDb")
.connect(process.env.DB_URI)
.then(()=> console.log("MongoDB Connected"))
.catch((err)=> console.error("MongoDB Connection Error:", err))

//Built-In middleware for parsing JSON//
app.use(express.json());
app.use(cors());



const userRoutes = require ("./routes/userRoutes");
app.use("/users", userRoutes);


const postRoutes = require ("./routes/postRoutes");
app.use("/posts", postRoutes);

























// //Create//
// app.post("/users", async (req, res)=>{
//     const user = new User(req.body);
//     await user.save();
//     res.send(user);
// }); 


//  //Read//
//  app.get("/users", async (req, res)=>{
//     const users = await User.find();
//     // res.send(users);
//     res.status(200).json(users)
//  });


//  //Update//
//  app.put("/users/:id", async (req, res)=>{
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//     });
//     res.send(user);
//  });


//  //Delete//
//  app.delete("/users/:id", async (req, res)=>{
//     await User.findByIdAndDelete(req.params.id);
//     res.send({message: "User deleted"});
//  });


// // Custom Middleware //
// app.use((req, res, next)=>{
//     console.log(`${req.method} request made to ${req.url}`);
//      next();
// });

// app.get("/", (req, res)=>{
//     res.send("Welcome to Backend Server");
// });

// app.post("/submit", (req, res)=>{
//     const {email, password}=req.body;
//     res.send(`Form Submitted ${email} and ${password}`);
// });

// // GetUsers//
// app.get("/users/:id", async (req, res) =>{
//     console.log(req.params);
//     const  { id } =req.params;

//     const user = await User.findById(id);
//     console.log(user);
//     res.status(200).json(user);
// })
// //    ///

// app.post("/products", async(req,res)=>{
//   const product = new Product (req.body);
//   await product.save()
//   res.send(product)
// });

// app.get("/products",async(req,res)=>{
//   const products = await Product.find()
//   res.send(products)
// });

// app.put("/products/:id", async(req,res)=>{
//      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//      });
//      res.send(product)
// });

// app.delete("/products/:id", async(req,res)=>{
//   await Product.findByIdAndDelete(req.params.id)
//   res.send({message: "Product deleted"})
// });


app.listen(PORT,()=>{
    console.log(`App running  on http://localhost:${PORT}`);
});




//REQ.PARAMS E.G /USERS/:ID
//REQ.QUERY E.G /USERS?ROLE=ADMIN
//REQ.BODY REQUIRES EXPRESS.JSON() MIDDLEWARE