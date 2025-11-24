const { mongoose } = require("mongoose")

const postSchema = new mongoose.Schema(
    {
        postlink: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            enum: ["pending", "rejected", "approved"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);
const affiliateSchema = new mongoose.Schema({
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BrandSetting',
        required: true
    },
    post: [
        postSchema
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model("Affiliate", affiliateSchema);