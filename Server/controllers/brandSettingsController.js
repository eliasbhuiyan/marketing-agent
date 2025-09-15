const { default: mongoose } = require("mongoose");
const BrandSettingsSchema = require("../models/BrandSettingsSchema");
const userSchema = require("../models/User");
const { generateInviteToken, verifyInviteToken } = require("../utils/jwt");
const { sendInvite } = require("../utils/mail");
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
        (entry) =>
          entry.brand?.toString() === brandId &&
          entry.role === "admin" &&
          entry.status === "active"
      );
      if (!isOwner && !isAdmin)
        return res
          .status(403)
          .json({ message: "Forbidden: only admins can update brand" });

      if (companyName !== undefined) brand.companyName = companyName;
      if (details !== undefined) brand.details = details;
      if (colors !== undefined) brand.colors = colors;
      if (fonts !== undefined) brand.fonts = fonts;
      if (assets !== undefined) brand.assets = assets;

      await brand.save();
      return res
        .status(200)
        .json({ message: "Brand updated successfully.", brand });
    }

    if (!companyName)
      return res.status(404).json({ message: "Company Name is required." });
    if (!details)
      return res.status(404).json({ message: "Company Details is required." });
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
          brandList: { brand: brand._id, role: "admin", status: "active" },
        },
      },
      { new: true }
    );

    return res
      .status(201)
      .json({ message: "Brand created successfully.", brand });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

      if (!brand)
        return res.status(404).json({ message: "Brand settings not found" });

      // Check membership (owner or editor)
      const isOwner = brand.owner._id.toString() === userId.toString();
      const isMember = brand.teamMembers.some(
        (tm) =>
          tm.user?._id?.toString() === userId.toString() &&
          tm.status === "active"
      );

      if (!isOwner && !isMember) {
        return res
          .status(403)
          .json({ message: "Forbidden: not a member of this brand" });
      }

      return res
        .status(200)
        .json({ message: "Brand fetched successfully.", brand });
    }
    // No selected brand: do not auto-pick. Signal client to create a new brand
    return res.status(404).json({ message: "No active brand selected" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const inviteTeamMember = async (req, res) => {
  try {
    const { addTeamMemberEmail } = req.body;
    if (!addTeamMemberEmail)
      return res
        .status(404)
        .json({ message: "Member email address is required." });
    const brand = await BrandSettingsSchema.findOne({ owner: req.user.id });

    if (!brand)
      return res.status(404).json({ message: "Unauthorized request." });

    // ✅ Add team member by email

    const user = await userSchema.findOne({ email: addTeamMemberEmail });

    if (!user)
      return res.status(404).json({ message: "This email is not registered." });

    const alreadyInTeam = brand.teamMembers?.some(
      (m) => m.user?.toString() === user._id.toString()
    );
    const isOwner = brand.owner?.toString() === user._id.toString();
    if (isOwner) {
      return res
        .status(404)
        .json({ message: "You can't invite the owner of the brand." });
    }
    if (alreadyInTeam) {
      return res
        .status(404)
        .json({ message: "This email already in member list" });
    }

    // Create token (expires in 3 days)
    const token = generateInviteToken(user.email, brand._id);

    // Send invite email
    const inviteLink = `http://localhost:3000/acceptinvite?token=${token}`;

    sendInvite(req.user.email, user.email, inviteLink);

    brand.teamMembers.push({
      user: user._id,
      role: "editor",
      status: "invited",
    });

    await brand.save();
    res.json({ message: "Invite sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const acceptInvitation = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) return res.status(400).json({ message: "Token is required" });

    const { email, brandId } = verifyInviteToken(token);
    if (!email || !brandId)
      return res.status(400).json({ message: "Invalid or expired token" });

    const user = await userSchema.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Step 1: Check membership status using aggregation
    const existing = await BrandSettingsSchema.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(brandId) } },
      { $unwind: "$teamMembers" },
      { $match: { "teamMembers.user": user._id } },
      { $project: { status: "$teamMembers.status" } },
    ]);

    if (existing.length > 0) {
      const memberStatus = existing[0].status;

      if (memberStatus === "active") {
        return res
          .status(400)
          .json({ message: "You are already an active member." });
      }

      if (memberStatus === "invited") {
        // Step 2: Update invited → active
        await BrandSettingsSchema.updateOne(
          {
            _id: brandId,
            "teamMembers.user": user._id,
          },
          { $set: { "teamMembers.$.status": "active" } }
        );

        user.brandList.push({
          brand: brandId,
          role: "editor",
          status: "active",
        });
        await user.save();

        return res
          .status(200)
          .json({ message: "Invite accepted successfully." });
      }
    }

    return res.status(500).json({ message: "Invalid request." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrUpdateBrandSettings,
  getBrandSettings,
  inviteTeamMember,
  acceptInvitation,
};
