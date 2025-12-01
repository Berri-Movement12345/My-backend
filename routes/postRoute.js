const  express = require("express");
// const router = express.Router();

const {getPosts, createPost, getPostById} = require ("../controllers/postController");

const router = express.Router();
router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getPostById);

module.exports = router;