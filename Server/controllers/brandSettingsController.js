const { default: mongoose } = require("mongoose");
const BrandSettingsSchema = require("../models/BrandSettingsSchema");
const userSchema = require("../models/User");
const { generateInviteToken, verifyInviteToken } = require("../utils/jwt");
const { sendInvite } = require("../utils/mail");
const cloudinary = require("../services/cloudinary");
const createOrUpdateBrandSettings = async (req, res) => {
  try {
    const {
      brandId,
      companyName,
      details,
      colors,
      assets,
      outputLanguage,
      existingAssets,
    } = req.body;
    const uploadedFiles = Array.isArray(req.files) ? req.files : [];
    const userId = req.user?._id || req.user?.id;
    const folderBrand = req.user?.brandId || userId;
    const uploadToCloudinary = async (file) => {
      const dataUri = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64"
      )}`;
      const res = await cloudinary.uploader.upload(dataUri, {
        folder: `margenai/${folderBrand}/assets`,
      });
      return res.secure_url || res.url;
    };
    const uploadedAssetUrls = [];
    for (const f of uploadedFiles) {
      const url = await uploadToCloudinary(f);
      if (url) uploadedAssetUrls.push(url);
    }
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
      if (typeof colors === "string") {
        try {
          brand.colors = JSON.parse(colors);
        } catch {}
      } else if (colors !== undefined) brand.colors = colors;
      if (assets !== undefined) brand.assets = assets;
      if (outputLanguage !== undefined) brand.outputLanguage = outputLanguage;

      const providedExisting = (() => {
        if (existingAssets) {
          try {
            return JSON.parse(existingAssets);
          } catch {
            return [];
          }
        }
        return Array.isArray(brand.assets) ? brand.assets : [];
      })();
      const extractPublicIdFromUrl = (url) => {
        try {
          const parts = url.split("/upload/");
          if (parts.length < 2) return null;
          let tail = parts[1];
          tail = tail.replace(/^v\d+\//, "");
          const dot = tail.lastIndexOf(".");
          if (dot !== -1) tail = tail.substring(0, dot);
          return tail;
        } catch {
          return null;
        }
      };
      const removedUrls = Array.isArray(brand.assets)
        ? brand.assets.filter((u) => !providedExisting.includes(u))
        : [];
      for (const u of removedUrls) {
        const pid = extractPublicIdFromUrl(u);
        if (pid) {
          try {
            await cloudinary.uploader.destroy(pid);
          } catch {}
        }
      }
      if (uploadedAssetUrls.length || existingAssets) {
        brand.assets = [...providedExisting, ...uploadedAssetUrls];
      }

      await brand.save();
      return res
        .status(200)
        .json({ message: "Brand updated successfully.", brand });
    }

    if (!companyName)
      return res.status(404).json({ message: "Company Name is required." });
    if (!details)
      return res.status(404).json({ message: "Company Details is required." });

    // A user can create single brand only (for now)
    const existingBrand = await BrandSettingsSchema.findOne({ owner: userId });
    if (existingBrand) {
      return res
        .status(400)
        .json({ message: "You have already created a brand." });
    }

    // No brandId: create a new brand for this user; user becomes admin
    let parsedColors = colors;
    if (typeof colors === "string") {
      try {
        parsedColors = JSON.parse(colors);
      } catch {}
    }

    const initialAssets = Array.isArray(existingAssets)
      ? existingAssets
      : typeof existingAssets === "string"
      ? (() => {
          try {
            return JSON.parse(existingAssets);
          } catch {
            return [];
          }
        })()
      : [];

    const brand = new BrandSettingsSchema({
      owner: userId,
      companyName,
      details,
      colors: parsedColors,
      assets: [...initialAssets, ...uploadedAssetUrls],
      outputLanguage,
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
  console.log("getting brand");

  try {
    // Prefer active brandId from token; fallback to query; else find owner's/first brand
    // const { brandId: brandIdQuery } = req.query;
    const selectedBrandId = req.user?.brandId;

    // Get brand with owner + team in one query
    const brand = await BrandSettingsSchema.findById(selectedBrandId).select("-owner -teamMembers -createdAt -updatedAt -__v");

    if (!brand)
      return res.status(404).json({ message: "Brand settings not found" });

    return res
      .status(200)
      .json({ message: "Brand fetched successfully.", brand });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTeamMembers = async (req, res) => {
  try {
    const Team = await BrandSettingsSchema.findById(req.user.brandId)
      .select("owner teamMembers")
      .populate("owner", "fullName email avatar")
      .populate("teamMembers.user", "fullName email avatar");
    if (!Team) return res.status(404).json({ message: "Team not found" });
    return res.status(200).json(Team);
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
    const mailData = {
      ownerEmail: req.user.email,
      memberEmail: user.email,
      memberName: user.fullName,
      link: inviteLink,
      brandName: brand.companyName,
    };
    sendInvite(mailData);

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

const deleteTeamMember = async (req, res) => {
  try {
    const { brandId, memberId } = req.body; // brandId = brand _id, memberId = user _id of member
    const userId = req.user.id; // logged-in user (admin)
    // Check if the requester is the brand owner/admin
    const brand = await BrandSettingsSchema.findById(brandId).select("owner");
    if (!brand) return res.status(404).json({ message: "Brand not found" });

    if (brand.owner.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Only brand owner can remove members" });
    }

    // Step 1: Remove member from brand.teamMembers
    const brandUpdate = await BrandSettingsSchema.updateOne(
      { _id: brandId },
      { $pull: { teamMembers: { user: memberId } } }
    );
    if (brandUpdate.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Member not found in this brand" });
    }

    // Step 2: Remove brand from user's brandList
    await userSchema.updateOne(
      { _id: memberId },
      { $pull: { brandList: { brand: brandId } } }
    );

    return res
      .status(200)
      .json({ message: "Team member removed successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrUpdateBrandSettings,
  getBrandSettings,
  getTeamMembers,
  inviteTeamMember,
  acceptInvitation,
  deleteTeamMember,
};
