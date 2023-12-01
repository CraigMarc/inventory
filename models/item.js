const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, minLength: 1, maxLength: 100 },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  number: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

// Virtual for item URL
ItemSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/item/${this._id}`;
});

// Export model
module.exports = mongoose.model("Item", ItemSchema);