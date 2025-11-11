const { mongoose } = require("mongoose")

const affiliateSchema = new mongoose.Schema({
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BrandSetting',
        required: true
    },
    post: [
        {
            postlink: {
                type: String,
                default: ''
            },
            status: {
                type: String,
                enum: ['pending', 'rejected', 'approved'],
                default: 'pending'
            }
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model("Affiliate", affiliateSchema);