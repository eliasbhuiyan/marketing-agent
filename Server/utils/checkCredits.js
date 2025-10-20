const BrandSettingsSchema = require("../models/BrandSettingsSchema");

const checkAndDeductCredits = async (brandId, requiredCredits) => {
  try {
    const credits = await BrandSettingsSchema.findById(brandId).select(
      "credits"
    );
    
    if (!credits) return false;    
    if (credits.credits < requiredCredits) return false;
        
    // deduct credits
    credits.credits -= requiredCredits;
    await credits.save();
    
    return true;
  } catch (error) {
    return false;
  }
};

const returnedCredits = async (brandId, creditsToReturn) => {
  try {
    const credits = await BrandSettingsSchema.findById(brandId).select(
      "credits"
    );
    if (!credits) return false;    
    // return credits
    credits.credits += creditsToReturn;
    await credits.save();
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = { checkAndDeductCredits, returnedCredits};
