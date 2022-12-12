const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    storeName: {
      type: String,
      required: true,
      unique: true
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true
    },
    city: {
      type: String,
      required: true
    },
    town: {
      type: String
    },
    address: {
      type: String,
      required: true
    },
    isSeller: {
      type: Boolean,
      default: false
    },
    verifiedPhoneNumber: {
      type: Boolean,
      default: false
    },
    verified: {
      type: Boolean,
      default: false
    },
    imageUrl: {
      type: [String]
    },
    points: {
      type: Number,
      required: true
    },
    businessNumber: {
      type: String,
      required: true,
      unique: true
    },
    referrals: {
      type: [String]
    },
    referree: {
      type: mongoose.Types.ObjectId
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      }
    }
  }
);

const Seller = mongoose.model("Seller", SellerSchema);

module.exports = Seller;
