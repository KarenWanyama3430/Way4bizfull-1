const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
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
    items: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product"
        },
        quantity: {
          type: Number,
          required: true
        },
        reviewed: {
          type: Boolean,
          default: false
        },
        sellerDispatched: {
          type: Boolean,
          default: false
        }
      }
    ],
    totalPrice: {
      type: Number,
      required: true
    },
    delivered: {
      type: Boolean,
      default: false
    },
    cancelled: {
      type: Boolean,
      default: false
    },
    paymentMethod: {
      type: String,
      required: true
    },
    distance: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Distance"
    },
    mpesaCode: {
      type: Number
    },
    mpesaDesc: {
      type: String
    },
    paid: {
      type: Boolean,
      default: false
    },
    brand: {
      type: String
    },
    last4: {
      type: String
    },
    deliveryMethod: {
      type: String,
      required: true
    },
    dispatched: {
      type: Boolean,
      default: false
    },
    checkoutRequestId: {
      type: String
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
