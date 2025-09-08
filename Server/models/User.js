const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true, required: true },
  googleId: { type: String },
  avatar: String,
  brandList: [
    {
      brand: { type: mongoose.Schema.Types.ObjectId, ref: "BrandSettings" },
      role: { type: String, enum: ["admin", "editor"], required: true },
      status: { type: String, enum: ["active", "invited"], default: "invited" }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);