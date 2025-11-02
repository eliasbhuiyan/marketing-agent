const { trendAnalyzerPromptTemplate } = require("../utils/promptTemplates");
const {
  default: TrendAnalyzerSchema,
} = require("../models/TrendAnalyzerSchema");

// Redis key for storing trends
const TRENDS_KEY = "marketing:trends";
const TRENDS_EXPIRY = 60 * 60 * 24; // 24 hours expiry

/**
 * Generate marketing trends using AI and store in Redis
 */
const generateTrends = async (user) => {
  try {
    const prompt = trendAnalyzerPromptTemplate();

    // AI API Call
    const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-nano-9b-v2:free",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const aiData = await aiRes.json();
    if (aiData.error) return;
    const cleaned = aiData.choices[0].message.content
      .replace(/```json|```/g, "").trim();
      const trends = JSON.parse(cleaned);
      
      // remove existing trends 
      await TrendAnalyzerSchema.deleteMany({});
      
      // insert new trends
      const trendsData = await TrendAnalyzerSchema.insertMany(trends);

    return trendsData;
  } catch (error) {
    console.error("Error generating trends:", error);
  }
};

/**
 * Get trends from Redis
 */
const getTrends = async (req, res) => {
  console.log("get trend api called");

  try {
    const trendsData = await TrendAnalyzerSchema.find({});
    console.log(trendsData);
    
    res.status(200).json(trendsData);
  } catch (error) {
    console.error("Error retrieving trends:", error);
    return res.status(500).json({ message: "Failed to retrieve trends" });
  }
};

/**
 * Force refresh trends
 */
const refreshTrends = async (req, res) => {
  try {
    const newTrends = await generateTrends();
    return res.json(newTrends);
  } catch (error) {
    console.error("Error refreshing trends:", error);
    return res.status(500).json({ message: "Failed to refresh trends" });
  }
};

module.exports = {
  generateTrends,
  getTrends,
  refreshTrends,
};
