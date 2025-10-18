const LibrarySchema = require("../models/LibrarySchema");

// Fetch images by brand ID
getImagesByBrandId = async (req, res) => {
  const brandId = req.user.brandId;

  if (!brandId) {
    return res.status(400).json({ message: "Brand ID is required." });
  }

  try {
    const images = await LibrarySchema.find({ brand: brandId });
    res.status(200).json({ success: true, images });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch images.", details: error.message });
  }
};

module.exports = {
  getImagesByBrandId,
};
