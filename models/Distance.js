const mongoose = require("mongoose");

const DistanceSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  shippingFees: {
    type: Number,
    required: true
  },
  buyer: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

const Distance = mongoose.model("Distance", DistanceSchema);

module.exports = Distance;
