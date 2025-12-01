
const express = require('express');
const mongoose = require("mongoose");
const User = require("./models/User");
const Post= require ("./models/Post");
const Comment =require("./models/Comment")
const Review = require("./models/Review");
const bcrypt = require ("bcryptjs");
const jwt = require ("jsonwebtoken");
const cors = require("cors");
const Product = require("./models/Products");




const app = express();

const PORT=2468;



mongoose.connect("mongodb://localhost:27017/myfirstDb")
.then(()=> console.log("MongoDB Connected"))
.catch((err)=> console.error("MongoDB Connection Error:", err))

//Built-In middleware for parsing JSON//
app.use(express.json())
app.use(cors())

// //  Generate Jwt Token //
// const token = JsonWebTokenError.sign({userId:user._id}, "SECRET_KEY",{expiresIn: "1h"});

// // Verify JWT Token//
// const decoded = jwt.verify(token, "SECRET_KEY");
// console.log(decoded);





// Role-based access middleware
// const authorize = (roles =[]) =>{
// return (req, res, next) => {
// if(!roles.includes(req.user.role)){
// return res.status(403).json({message: "Access denied"});
// }
// next();
// };
// };

// // Usage in route //
//  app.get("/admin", authorize(["admin"]), (req, res) =>{
// res.send ("Welcome Admin");
// });



// const authenticate = (req, res, next) => {
//     const token  =req.headers["authorization"]?.spilt(" ") [1];
//     if(!token) return res.status(401).json({message: "No token provided"});

//     jwt.verify(token,  "SECRET_KEY", (err, user)=>{
//         if (err) return res.status(403).json({message: "Invalid token "});
//         req.user= user
//         next();
//     });
// };

// Usage //
// app.get("/profile", authenticate, (req, res)=>{
//     res.send(`Welcome User ${req.user.userId}`);
// });



// // Middleware for parsing URL-encoded data //
app.post ("/signup", async (req, res)=>{
    console.log(req.body);

    const {email, password}=req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({email, password: hashedPassword, role: "User"});
    await user.save();
    // res.status (200).json("User registered successfully",email);
    res.status(200).json(user);
});

app.post("/login", async (req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message: "User not found"});

    const isPasswordVaild = await bcrypt.compare(pmpassword, user.password);
    if(!isPasswordVaild) return res.status(400).json({message: "Invalid password"});
    const token = jwt.sign({userId: user._id, role: user.role}, "SECRET_KEY", {expiresIn: "1h",
    });
    res.json({token});
});















// app.use(express.urlencoded({ extended: true }));

// app.get("/users", (req, res)=> res.json({message: "Get all users"}));
// app.post("/users", (req, res)=> res.json({message: "Create a new user"}));
// app.get("/users/:id", (req, res)=> res.json({message:`Get user ${req.params.id}`}));
// app.put("/users/:id",(req, res)=> res.json({message: `Update user ${req.params.id}`}));
// app.delete("/users/:id", (req, res)=> res.json({message: `Delete user ${req.params.id}`}))
// // app.get("/search", (req, res)=> { const { role } = req.query; res.json({message: `Searching users with role: ${role}`})});
// app.get("/search", (req, res)=> { const { role } = req.query; res.json({message: `Searching users with role: ${role}`})});




// // Review //
// app.post ("/reviews", async (req, res)=>{
//     const review = new Review(req.body);
//     await review.save();
//     res.send(review);
// });
// app.get ("/reviews", async (req, res)=>{
//     const reviews = await Review.find();
//     res.send(reviews);
// });
// app.put ("/reviews/:id", async (req, res)=>{
//     const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//     });
//     res.send(review);
// });

// app.delete ("/reviews/:id", async (req, res)=>{
//     await Review.findByIdAndDelete(req.params.id);
//     res.send({message: "Review deleted"});
// });


// // post //
// app.post ("/posts", async (req, res)=>{
//     const post = new Post(req.body);
//     await post.save();
//     res.send(post);
// });

// app.get ("/posts", async (req, res)=>{
//     const posts = await Post.find();
//     res.send(posts);
// });

// app.put ("/posts/:id", async (req, res)=>{
//     const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//     });
//     res.send(post);
// });

// app.delete ("/posts/:id", async (req, res)=>{
//     await Post.findByIdAndDelete(req.params.id);
//     res.send({message: "Post deleted"});
// });





// // Comment //
// app.post("/comments", async (req, res)=>{
//     const comment = new Comment(req.body);
//     await comment.save();
//     res.send(comment);
// });

// app.get ("/comments", async (req, res)=>{
//     const comments = await Comment.find();
//     res.send(comments);
// });
// app.put ("/comments/:id", async (req, res)=>{
//     const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//     });
//     res.send(comment);
// });

// app.delete ("/comments/:id", async (req, res)=>{
//     await Comment.findByIdAndDelete(req.params.id);
//     res.send({message: "Comment deleted"});
// });






//Create//
app.post("/users", async (req, res)=>{
    const user = new User(req.body);
    await user.save();
    res.send(user);
}); 


 //Read//
 app.get("/users", async (req, res)=>{
    const users = await User.find();
    // res.send(users);
    res.status(200).json(users)
 });


 //Update//
 app.put("/users/:id", async (req, res)=>{
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.send(user);
 });


 //Delete//
 app.delete("/users/:id", async (req, res)=>{
    await User.findByIdAndDelete(req.params.id);
    res.send({message: "User deleted"});
 });


// Custom Middleware //
app.use((req, res, next)=>{
    console.log(`${req.method} request made to ${req.url}`);
     next();
});

app.get("/", (req, res)=>{
    res.send("Welcome to Backend Server");
});

app.post("/submit", (req, res)=>{
    const {email, password}=req.body;
    res.send(`Form Submitted ${email} and ${password}`);
});

// get//
app.get("/users/:id", async (req, res) =>{
    console.log(req.params);
    const  { id } =req.params;

    const user = await User.findById(id);
    console.log(user);
    res.status(200).json(user);
})
//    ///

app.post("/products", async(req,res)=>{
  const product = new Product (req.body);
  await product.save()
  res.send(product)
});

app.get("/products",async(req,res)=>{
  const products = await Product.find()
  res.send(products)
});

app.put("/products/:id", async(req,res)=>{
     const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
     });
     res.send(product)
});

app.delete("/products/:id", async(req,res)=>{
  await Product.findByIdAndDelete(req.params.id)
  res.send({message: "Product deleted"})
});


app.listen(PORT,()=>{
    console.log(`App running  on http://localhost:${PORT}`);
});




//REQ.PARAMS E.G /USERS/:ID
//REQ.QUERY E.G /USERS?ROLE=ADMIN
//REQ.BODY REQUIRES EXPRESS.JSON() MIDDLEWARE