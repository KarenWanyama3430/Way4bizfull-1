const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  items: {
    type: [Object],
    required: true
  },
  buyer: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
});
const Wishlist = mongoose.model("Wishlist", WishlistSchema);
module.exports = Wishlist;
