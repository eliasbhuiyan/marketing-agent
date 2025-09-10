const BrandSettingsSchema = require("../models/BrandSettingsSchema");
const userSchema = require("../models/User")
const createOrUpdateBrandSettings = async (req, res) => {
  try {
    const { brandId, companyName, details, colors, fonts, assets } = req.body;
    const userId = req.user?._id || req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    // If brandId provided: update only if requester is admin of that brand
    if (brandId) {
      const brand = await BrandSettingsSchema.findById(brandId);
      if (!brand) return res.status(404).json({ message: "Brand not found" });

      const user = await userSchema.findById(userId).select("brandList");
      const isOwner = brand.owner?.toString() === userId.toString();
      const isAdmin = user?.brandList?.some(
        (entry) => entry.brand?.toString() === brandId && entry.role === "admin" && entry.status === "active"
      );
      if (!isOwner && !isAdmin) return res.status(403).json({ message: "Forbidden: only admins can update brand" });

      if (companyName !== undefined) brand.companyName = companyName;
      if (details !== undefined) brand.details = details;
      if (colors !== undefined) brand.colors = colors;
      if (fonts !== undefined) brand.fonts = fonts;
      if (assets !== undefined) brand.assets = assets;

      await brand.save();
      return res.status(200).json({ message: "Brand updated successfully.", brand });
    }

    // No brandId: create a new brand for this user; user becomes admin
    const brand = new BrandSettingsSchema({
      owner: userId,
      companyName,
      details,
      colors,
      fonts,
      assets,
    });

    await brand.save();

    // Add to user's brandList as admin (active)
    await userSchema.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          brandList: { brand: brand._id, role: "admin", status: "active" }
        }
      },
      { new: true }
    );

    return res.status(201).json({ message: "Brand created successfully.", brand });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBrandSettings = async (req, res) => {

  try {
    // Prefer active brandId from token; fallback to query; else find owner's/first brand
    // const { brandId: brandIdQuery } = req.query;
    const tokenBrandId = req.user?.brandId;
    const selectedBrandId = tokenBrandId;
    
    const userId = req.user?._id || req.user?.id;
    let brand;
    if (selectedBrandId) {
      // Get brand with owner + team in one query
      brand = await BrandSettingsSchema.findById(selectedBrandId)
        .populate("owner", "fullName email avatar")
        .populate("teamMembers.user", "fullName email avatar");

      if (!brand) return res.status(404).json({ error: "Brand settings not found" });

      // Check membership (owner or editor)
      const isOwner = brand.owner._id.toString() === userId.toString();
      const isMember = brand.teamMembers.some(
        (tm) => tm.user?._id?.toString() === userId.toString() && tm.status === "active"
      );

      if (!isOwner && !isMember) {
        return res.status(403).json({ error: "Forbidden: not a member of this brand" });
      }

      return res.status(200).json({ message: "Brand fetched successfully.", brand });
    }
    // No selected brand: do not auto-pick. Signal client to create a new brand
    return res.status(404).json({ error: "No active brand selected" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBrandSettings = async (req, res) => {
  try {
    const { companyName, colors, fonts, assets, addTeamMemberEmail, removeTeamMemberId } = req.body;

    const brand = await BrandSettingsSchema.findOne({ owner: req.user._id });
    if (!brand) return res.status(404).json({ message: "Brand settings not found" });

    // ✅ update general brand settings
    if (companyName) brand.companyName = companyName;
    if (colors) brand.colors = colors;
    if (fonts) brand.fonts = fonts;
    if (assets) brand.assets = assets;

    // ✅ Add team member by email
    if (addTeamMemberEmail) {
      const user = await userSchema.findOne({ email: addTeamMemberEmail });
      if (!user) return res.status(404).json({ message: "User not found" });
      const alreadyInTeam = brand.teamMembers?.some((m) => m.user?.toString() === user._id.toString());
      if (!alreadyInTeam) {
        brand.teamMembers.push({ user: user._id, role: "editor", status: "invited" });
      }
    }

    // ✅ Remove team member
    if (removeTeamMemberId) {
      brand.teamMembers = brand.teamMembers.filter(
        (member) => member.user?.toString() !== removeTeamMemberId
      );
    }

    await brand.save();
    res.json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createOrUpdateBrandSettings, getBrandSettings, updateBrandSettings }