const UsageHistory = require("../models/UsageHistory");

const getUsageHistory = async (req, res) => {
  const brandId = req.user.brandId;

  if (!brandId) {
    return res.status(400).json({ message: "Brand ID is required." });
  }

  // Pagination parameters
  const type = req.query.type || "";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 25;
  const skip = (page - 1) * limit;

  try {
    // Get total count for pagination metadata
    const totalCount = await UsageHistory.countDocuments({ brand: brandId });
    // Get paginated data
    const historyData = await UsageHistory.find({
      brand: brandId,
      ...(type !== "all" && { type }),
    })
      .populate("generatedBy", "fullName")
      .select("content createdAt credits generatedBy status type")
      .sort({ createdAt: -1 }) // Sort by most recent first
      .skip(skip)
      .limit(limit)
      .exec();

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.status(200).json({
      data: historyData,
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage,
        hasPrevPage,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching usage history", error: error.message });
  }
};

const getSingleHistory = async (req, res) => {
  const historyId = req.query.id;
  if (!historyId) return res.status(400).json({ message: "History ID is required." });
  const brandId = req.user.brandId;
  if (!brandId) {
    return res.status(400).json({ message: "Brand ID is required." });
  }
  try {
    const historyData = await UsageHistory.findOne({
      _id: historyId,
      brand: brandId,
    })
      .select("content")
      .exec();
    if (!historyData) {
      return res.status(404).json({ message: "Usage history not found." });
    }
    res.status(200).json(
      historyData.content,
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching usage history", error: error.message });
  }
}

module.exports = {
  getUsageHistory,
  getSingleHistory,
};
