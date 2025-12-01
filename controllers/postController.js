const Post = require("../models/Post");

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find(); 
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
// Create a new post
const createPost = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const post = new Post({ title, content, author });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


module.exports = { getAllPosts, createPost };