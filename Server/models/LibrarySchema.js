const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema(
  {
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BrandSetting",
      required: true,
    },
    image: { type: String, required: true },
    type: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Library", librarySchema);
