const bcrypt = require("bcryptjs");
const userSchema = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");

// ✅ Google Callback (signup + login)
const googleCallback = async (req, res) => {
  const accessToken = generateAccessToken(req.user, undefined);
  const refreshToken = generateRefreshToken(req.user, undefined);

  res.cookie("_optimise_access_token", accessToken, {
    httpOnly: true,
    secure: false, // set true in production
    // sameSite: "none",
    // Access token is short-lived; let browser manage via expiry in token as well
  });
  res.cookie("_optimise_refresh_token", refreshToken, {
    httpOnly: true,
    secure: false, // set true in production
    // sameSite: "none",
    // 30d default, align with token expiry
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.redirect(`${process.env.CLIENT_URL}/success`);
};

const userProfile = async (req, res) => {
  console.log("called profile");
  
  const userData = await userSchema
    .findOne({ email: req.user.email })
    .select("-googleId")
    .populate({ path: "brandList.brand", select: "companyName _id" });
  if(!userData) return res.status(404).send({ error: "User not found" });
  
  const simplifiedBrands = (userData.brandList || []).map((entry) => ({
    brandId: entry.brand?._id,
    companyName: entry.brand?.companyName || "Untitled brand",
    role: entry.role,
    status: entry.status,
  }));

  res.status(200).json({
    message: "User profile fetched successfully",
    user: {
      _id: userData._id,
      fullName: userData.fullName,
      email: userData.email,
      avatar: userData.avatar,
      brandList: simplifiedBrands,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    },
  });
};

const logoutUser = async (req, res) => {
  res.clearCookie("_optimise_access_token");
  res.clearCookie("_optimise_refresh_token");
  res.status(200).json("Logged out successfully");
};

// ✅ Refresh access token using refresh token cookie
const refreshAccessToken = async (req, res) => {
  try {
    const token = req.cookies["_optimise_refresh_token"];
    if (!token) return res.status(401).json({ error: "No refresh token" });
    const decoded = verifyRefreshToken(token);
    // Optional: ensure the user still exists
    const user = {
      _id: decoded.id,
      email: decoded.email
    }
    // Rotate refresh token for better security
    const newRefresh = generateRefreshToken(user, decoded.brandId);
    const newAccess = generateAccessToken(user, decoded.brandId);

    res.cookie("_optimise_access_token", newAccess, {
      httpOnly: true,
      secure: false,
      // sameSite: "none",
    });
    res.cookie("_optimise_refresh_token", newRefresh, {
      httpOnly: true,
      secure: false,
      // sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(401).json({ error: "Invalid refresh token" });
  }
};

// ✅ Set active brand and re-issue tokens with brandId
const setActiveBrand = async (req, res) => {  
  try {
    const { brandId } = req.body || {};
    const decoded = req.user; // from access token
    if (!decoded?.id) return res.status(401).json({ error: "Unauthorized" });
    
    const user = await userSchema.findById(decoded.id).select("_id email brandList");
    if (!user) return res.status(404).json({ error: "User not found" });

    // Ensure user belongs to the brandId if provided
    if (brandId) {
      const belongs = user.brandList?.some((e) => String(e.brand) === String(brandId));
      if (!belongs) return res.status(403).json({ error: "Forbidden: not a member of this brand" });
    }

    const newRefresh = generateRefreshToken(user, brandId);
    const newAccess = generateAccessToken(user, brandId);    
    res.cookie("_optimise_access_token", newAccess, {
      httpOnly: true,
      secure: false, // set true in production
      // sameSite: "none",
      // Access token is short-lived; let browser manage via expiry in token as well
    });
    res.cookie("_optimise_refresh_token", newRefresh, {
      httpOnly: true,
      secure: false, // set true in production
      // sameSite: "none",
      // 30d default, align with token expiry
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: "Failed to set brand" });
  }
};

module.exports = { googleCallback, userProfile, logoutUser, refreshAccessToken, setActiveBrand };