const mongoose = require("mongoose");

const BrandSettingsSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    companyName: { type: String },
    colors: {
        primary: { type: String, default: "#000000" },
        secondary: { type: String, default: "#FFFFFF" },
        accent: { type: String, default: "#FF5733" }
    },
    fonts: {
        headingFont: { type: String, default: "Poppins" },
        bodyFont: { type: String, default: "Roboto" }
    },
    assets: {
        logo: { type: String },
        otherAssets: [{ type: String }]
    },
    teamMembers: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          role: { type: String, enum: ["editor"], default: "editor" },
          status: { type: String, enum: ["active", "invited"], default: "invited" }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("BrandSettings", BrandSettingsSchema);
