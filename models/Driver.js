const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
});

const DriverSchema = new mongoose.Schema(
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
    verified: {
      type: Boolean,
      default: false
    },
    phoneNumber: {
      type: Number,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    IdNumber: {
      type: Number,
      required: true,
      unique: true
    },
    vehicleNo: {
      type: String,
      required: true,
      unique: true
    },
    location: locationSchema,
    free: {
      type: Boolean,
      default: true
    },
    clients: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User"
      }
    ]
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

const Driver = mongoose.model("Driver", DriverSchema);

module.exports = Driver;
