const mongoose = require("mongoose");

//create a schema
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email:{type: String, required: true, unique: true},
    password: { type: String, required: true},
}); 



// Create a Model
const User = mongoose.model("User", userSchema);

module.exports = User;