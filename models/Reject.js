const mongoose = require("mongoose");

const RejectSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true
    },
    body: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Reject = mongoose.model("Reject", RejectSchema);
module.exports = Reject;
