const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User"
  },
  buyerSeller: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Seller"
  },
  order: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Order"
  },

  product: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Product"
  },
  body: {
    type: String,
    required: true
  }
});

const Complaint = mongoose.model("Complaint", ComplaintSchema);
module.exports = Complaint;
