const UsageHistory = require("../models/UsageHistory");

const CreateUsageHistory = (
  brand,
  generatedBy,
  type,
  content,
  credits,
) => {
    
    const history = new UsageHistory({
        brand,
        generatedBy,
        type,
        content,
        credits,
    });
    history.save();
};
