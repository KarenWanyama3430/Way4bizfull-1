const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User"
    },
    userSeller: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Seller"
    },
    reason: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    read: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
