const mongoose = require("mongoose");


//create a schema
const commentSchema = new mongoose.Schema({
    postId:mongoose.Schema.Types.ObjectId,
    user:String,
    text:String,
    like: {type: Number, default: 0}
}); 


// Create a Model
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;