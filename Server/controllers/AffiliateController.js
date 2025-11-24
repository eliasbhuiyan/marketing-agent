const { default: mongoose } = require("mongoose");
const AffiliateSchema = require("../models/AffiliateSchema");
const BrandSettingsSchema = require("../models/BrandSettingsSchema");

const postAffiliateLink = async (req, res) => {
  const { postLink } = req.body;
  const brandId = req.user.brandId;

  try {
    if (!postLink)
      return res.status(400).json({ message: "Post link is required" });
    if (!brandId)
      return res.status(400).json({ message: "Invalid request, try again" });

    // create new affiliate link if dose not exist by brandId, is exist then update postlink
    const affiliate = await AffiliateSchema.findOne({ brand: brandId });
    if (affiliate) {
      const latestApproved = (affiliate.post || [])
        .filter((p) => p.status === "approved" || p.status === "pending")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
      if (latestApproved) {
        const nextEligibleDate = new Date(latestApproved.createdAt);
        nextEligibleDate.setMonth(nextEligibleDate.getMonth() + 1);
        if (new Date() < nextEligibleDate) {
          return res
            .status(400)
            .json({ message: `You can submit after ${nextEligibleDate.toLocaleString()}` });
        }
      }
    }
    if (!affiliate) {
      await AffiliateSchema.create({
        brand: brandId,
        post: [
          {
            postlink: postLink,
          },
        ],
      });
    } else {
      affiliate.post.push({
        postlink: postLink,
      });
      await affiliate.save();
    }
    return res
      .status(201)
      .json({ message: "Affiliate link created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message || error });
  }
};
// Update affiliate link status by brandId
const updateAffiliateLinkStatus = async (req, res) => {
  const { brandId, postId, credits, status } = req.body;

  try {
    if (status === "approved" && !credits)
      return res.status(400).json({ message: "Credits is required" });
    if (!brandId || !postId || !status)
      return res.status(400).json({ message: "Invalid request, try again" });

    const affiliate = await AffiliateSchema.updateOne(
      { brand: brandId, "post._id": postId },
      [
        {
          $set: {
            post: {
              $map: {
                input: "$post",
                as: "p",
                in: {
                  $cond: [
                    { $eq: ["$$p._id", new mongoose.Types.ObjectId(postId)] },
                    { $mergeObjects: ["$$p", { status }] },
                    "$$p",
                  ],
                },
              },
            },
          },
        },
      ]
    );
    if (affiliate.modifiedCount === 0)
      return res.status(404).json({ message: "No post link found" });
    console.log(affiliate);

    // if status is approved then give credits to brand
    if (status === "approved") {
      const brand = await BrandSettingsSchema.findById(brandId);
      if (!brand) return res.status(404).json({ message: "No brand found" });
      brand.credits += credits;
      await brand.save();
    }
    return res.status(200).json({ affiliate });
  } catch (error) {
    return res.status(500).json({ message: error.message || error });
  }
};

const getAffiliateLinks = async (req, res) => {
  const brandId = req.user.brandId;

  if (!brandId)
    return res.status(400).json({ message: "Invalid request, try again" });

  const affiliate = await AffiliateSchema.findOne({ brand: brandId });
  if (!affiliate)
    return res.status(404).json({ message: "No affiliate link found" });
  return res.status(200).json({ affiliate });
};

// Get all affiliate links
const getAllAffiliateLinks = async (req, res) => {
  try {
    // Read pagination params with sensible defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Count total documents
    const totalItems = await AffiliateSchema.countDocuments();
    if (totalItems === 0) {
      return res.status(404).json({ message: "No affiliate link found" });
    }

    // Retrieve paginated results
    const affiliate = await AffiliateSchema.find()
      .populate("brand", "companyName")
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalItems / limit);

    return res.status(200).json({
      affiliate,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: error.message || error });
  }
};

module.exports = {
  postAffiliateLink,
  getAffiliateLinks,
  getAllAffiliateLinks,
  updateAffiliateLinkStatus,
};
