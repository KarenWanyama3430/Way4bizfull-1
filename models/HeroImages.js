const mongoose = require("mongoose");

const HeroImageSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const HeroImage = mongoose.model("HeroImage", HeroImageSchema);
module.exports = HeroImage;
