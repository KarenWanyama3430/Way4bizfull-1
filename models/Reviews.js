const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      default: 0
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
    userSeller: {
      type: mongoose.Types.ObjectId,
      ref: "Seller"
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true
    },
    order: {
      type: mongoose.Types.ObjectId,
      ref: "Order",
      required: true
    }
  },
  { timestamps: true }
);
const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
