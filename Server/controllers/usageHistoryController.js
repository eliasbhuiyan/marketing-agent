const UsageHistory = require("../models/UsageHistory");
function getStartDate(period) {
  const now = new Date();
  switch (period) {
    case "1d":
      return new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
    case "7d":
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case "30d":
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    default:
      return new Date(0); // Return all history if period is unrecognized
  }
}
const getUsageHistory = async (req, res) => {
  const brandId = req.user.brandId;

  if (!brandId) {
    return res.status(400).json({ message: "Brand ID is required." });
  }

  const period = req.query.period || "7d";

  // Logic to fetch usage history based on brandId and period would go here

  const historyData = await UsageHistory.find({ brand: brandId }).populate('generatedBy', 'fullName')
    .where("createdAt")
    .gte(getStartDate(period))
    .exec();

  res.status(200).json({ data: historyData });
};

module.exports = {
  getUsageHistory,
};