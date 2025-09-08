const BrandSettingsSchema = require("../models/BrandSettingsSchema");
const userSchema = require("../models/User")
const createBrandSettings = async (req, res) => {
    try {
      const { companyName, colors, fonts, assets } = req.body;
  
      const existing = await BrandSettingsSchema.findOne({ owner: req.user._id });
      if (existing) {
        return res.status(400).json({ message: "Brand settings already exist" });
      }
  
      const brand = new BrandSettingsSchema({
        owner: req.user._id,
        companyName,
        colors,
        fonts,
        assets,
      });
  
      await brand.save();
   
    // ❗  Need modification

      req.user.BrandSettingsSchema = brand._id;
      await req.user.save();
  
      res.status(201).json({message: "Barnd Settings created successfully.", brand});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const getBrandSettings = async (req, res) => {
    try {
      const brand = await BrandSettingsSchema.findOne({ owner: req.user._id }).populate("teamMembers");
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
        if (user) {
          return res.status(400).json({ message: "User already belongs to another brand" });
        }
  
        if (!brand.teamMembers.includes(user._id)) {
          brand.teamMembers.push(user._id);
        }
      }
  
      // ✅ Remove team member
      if (removeTeamMemberId) {
        brand.teamMembers = brand.teamMembers.filter(
          (memberId) => memberId.toString() !== removeTeamMemberId
        );
      }
  
      await brand.save();
      res.json(brand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {createBrandSettings, getBrandSettings, updateBrandSettings}