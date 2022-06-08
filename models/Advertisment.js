const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    title: String,
    description: String,
    completed: {
      type: Boolean,
      default: false, // wartość domyślna
    },
    createdTime: {
      type: Date,
      default: new Date(), // wartość domyślna
    },
    category: String,
    labels: [],
    price: Number,
    owner: {
      name: String,
      phoneNumber: String,
      createdTime: {
        type: Date,
        default: new Date(),
      },
      lastActivity: Date,
      valuation: {
        type: Number,
        // walidacja
        min: 0,
        max: 100,
        required: true,
      },
      email: String,
    },
    comments: [],
    location: {
      address: String,
      geo: {
        lat: Number,
        lng: Number,
      },
    },
    display: Number,
    valuation: {
      type: Number,
      // walidacja
      min: 0,
      max: 100,
      required: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Advertisment", schema);
