const AffiliateSchema = require("../models/AffiliateSchema");
const BrandSettingsSchema = require("../models/BrandSettingsSchema");

const postAffiliateLink = async (req, res) => {
    const { postLink } = req.body;
    const brandId = req.user.brandId;

    if (!postLink) return res.status(400).json({ message: 'Post link is required' });
    if (!brandId) return res.status(400).json({ message: 'Invalid request, try again' });

    // create new affiliate link if dose not exist by brandId, is exist then update postlink
    const affiliate = await AffiliateSchema.findOne({ brand: brandId });
    if (!affiliate) {
        await AffiliateSchema.create({
            brand: brandId,
            post: [{
                postlink: postLink,
            }]
        });
    } else {
        affiliate.post.push({
            postlink: postLink,
        });
        await affiliate.save();
    }
}
// Update affiliate link status by brandId 
const updateAffiliateLinkStatus = async (req, res) => {
    const { brandId, postId, credits, status } = req.body;

    if (!brandId || !postId || !credits || !status) return res.status(400).json({ message: 'Invalid request, try again' });

    const affiliate = await AffiliateSchema.findOne({ brand: brandId });
    if (!affiliate) return res.status(404).json({ message: 'No affiliate link found' });

    const post = affiliate.post.find(p => p._id === postId);
    if (!post) return res.status(404).json({ message: 'No post link found' });

    post.status = status;
    await affiliate.save();
    // if status is approved then give credits to brand
    if (status === 'approved') {
        const brand = await BrandSettingsSchema.findById(brandId);
        if (!brand) return res.status(404).json({ message: 'No brand found' });
        brand.credits += credits;
        await brand.save();
    }
    return res.status(200).json({ affiliate });
}

const getAffiliateLinks = async (req, res) => {
    const brandId = req.params.brandId;
   
    if (!brandId) return res.status(400).json({ message: 'Invalid request, try again' });

    const affiliate = await AffiliateSchema.findOne({ brand: brandId });
    if (!affiliate) return res.status(404).json({ message: 'No affiliate link found' });
    return res.status(200).json({ affiliate });
}

// Get all affiliate links
const getAllAffiliateLinks = async (req, res) => {
    const affiliate = await AffiliateSchema.find().populate('brand').select('brand.companyName post');
    if (!affiliate) return res.status(404).json({ message: 'No affiliate link found' });
    return res.status(200).json({ affiliate });
}

module.exports = {
    postAffiliateLink,
    getAffiliateLinks,
    getAllAffiliateLinks,
    updateAffiliateLinkStatus
}