const mongoose = require("mongoose");

const integrationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    platform: {
        type: String,
        enum: ["facebook", "instagram", "linkedin", "twitter", "youtube", "wordpress"],
        required: true
    },
    accessToken: { type: String, required: true },
    refreshToken: { type: String },
    expiresAt: { type: Date }
}, { timestamps: true });

export default mongoose.model("Integration", integrationSchema);