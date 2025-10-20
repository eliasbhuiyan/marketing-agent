const UsageHistory = require("../models/UsageHistory");

const CreateUsageHistory = (brand, generatedBy, type, content, credits, status) => {
  try {
    const history = new UsageHistory({
      brand,
      generatedBy,
      type,
      content,
      credits,
      status
    });
    history.save();
    return history._id;
  } catch (error) {
    console.error("Error creating usage history:", error);
  }
};

const updateUsageHistory = async (historyId, status) => {
  try {
    // Find the usage history by ID and update its status and credits
    const history = await UsageHistory.findOneAndUpdate(
      { _id: historyId },
      { status, credits: 0 },
      { new: true }
    );
    return history;
  } catch (error) {
    console.error("Error updating usage history:", error);
  }
};

module.exports = { CreateUsageHistory, updateUsageHistory };
