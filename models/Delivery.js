const mongoose = require("mongoose");

const DeliverySchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Types.ObjectId,
      ref: "Driver",
      required: true
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    userSeller: {
      type: mongoose.Types.ObjectId,
      ref: "Seller",
      required: true
    },
    itemName: {
      type: String,
      required: true
    },
    itemQuantity: {
      type: Number,
      required: true
    },
    receiverFullName: {
      type: String,
      required: true
    },
    receiverPhoneNumber: {
      type: Number,
      required: true
    },
    receiverCity: {
      type: String,
      required: true
    },
    receiverAddress: {
      type: String,
      required: true
    },
    delivered: {
      type: Boolean,
      default: false
    },
    charge: {
      type: Number,
      required: true
    },
    confirmed: {
      type: Boolean,
      default: false
    },
    deliveryDate: {
      type: Date
    }
  },
  { timestamps: true }
);

const Delivery = mongoose.model("Delivery", DeliverySchema);

module.exports = Delivery;
