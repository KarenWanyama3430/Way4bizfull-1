const mongoose = require("mongoose");

const RedeemSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Seller"
    },
    amount: {
      type: Number,
      required: true
    },
    paid: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Redeem = mongoose.model("Redeem", RedeemSchema);
module.exports = Redeem;
