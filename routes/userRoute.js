const express = require("express");
// const router = express.Router();
// const User = require("../models/User");

const {getUser, signup, login, getUserById} = require ("../controllers/userController");

const router = express.Router();
router.get("/", getUser);
router.post("/signup", signup);
router.post("/login", login);
router.get("/:id", getUserById);

module.exports = router;