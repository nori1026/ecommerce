const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema(
  {
    product: {
      type: String
    },
    value: {
      type: Number,
      required: true
    },
    purchaseId: {
      type: String
    },
    user: {
      type: String
    }
  },

  { collection: "counter" }
);

module.exports = Item = mongoose.model("counter", ItemSchema);
