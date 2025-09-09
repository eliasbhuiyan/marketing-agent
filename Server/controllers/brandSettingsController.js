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
      const { brandId: brandIdQuery } = req.query;
      const tokenBrandId = req.user?.brandId;
      const selectedBrandId = tokenBrandId || brandIdQuery;
      const userId = req.user?._id || req.user?.id;

      if (selectedBrandId) {
        const user = await userSchema.findById(userId).select("brandList");
        const isMember = user?.brandList?.some((e) => e.brand?.toString() === selectedBrandId);
        const brandOwnerDoc = await BrandSettingsSchema.findById(selectedBrandId).select("owner");
        if (!brandOwnerDoc) return res.status(404).json({ message: "Brand settings not found" });
        const isOwner = brandOwnerDoc.owner?.toString() === userId.toString();
        if (!isMember && !isOwner) return res.status(403).json({ message: "Forbidden: not a member of this brand" });
        const brand = await BrandSettingsSchema.findById(selectedBrandId).populate("teamMembers.user");
        if (!brand) return res.status(404).json({ message: "Brand settings not found" });
        return res.json({message: "Brand fetched successfully.", brand});
      }

      // Try owner's brand first
      let brand = await BrandSettingsSchema.findOne({ owner: userId }).populate("teamMembers.user");
      if (!brand) {
        // Then any brand from user's brandList
        const user = await userSchema.findById(userId).select("brandList");
        const firstBrandId = user?.brandList?.[0]?.brand;
        if (firstBrandId) {
          brand = await BrandSettingsSchema.findById(firstBrandId).populate("teamMembers.user");
        }
      }
      if (!brand) return res.status(404).json({ message: "Brand settings not found" });
      res.json({message: "Brand fetched successfully.", brand});
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

module.exports = {createOrUpdateBrandSettings, getBrandSettings, updateBrandSettings}