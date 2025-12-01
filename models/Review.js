const mongoose = require("mongoose");

// create a schema
const reviewSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  user: String,
  rating: Number,
  text: String,
  likes: { type: Number, default: 0 }
});

// create a Model
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
