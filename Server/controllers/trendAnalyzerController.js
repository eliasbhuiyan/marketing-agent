const Redis = require("ioredis");
const { trendAnalyzerPromptTemplate } = require("../utils/promptTemplates");

// Redis key for storing trends
const TRENDS_KEY = 'marketing:trends';
const TRENDS_EXPIRY = 60 * 60 * 24; // 24 hours expiry

const client = new Redis("rediss://default:ARvlAAImcDJhZGU5ZmZiNTc4NjQ0MGZiYjY5NDM2YzM5OWE1ZTQxY3AyNzE0MQ@humane-kingfish-7141.upstash.io:6379");


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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "x-ai/grok-4-fast:free",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const aiData = await aiRes.json();
    if(aiData.error) return;
    const cleaned = aiData.choices[0].message.content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
    const trends = JSON.parse(cleaned);
    
    // Store trends in Redis with timestamp
    const trendsData = {
      data: trends,
      timestamp: new Date().toISOString(),
    };
    // console.log(trends);
    await client.set(TRENDS_KEY, JSON.stringify(trendsData));
   
    return trendsData;
  } catch (error) {
    console.error('Error generating trends:', error);
  }
};

/**
 * Get trends from Redis
 */
const getTrends = async (req, res) => {
  console.log("get trend api called");
  
  try {
    const trendsData = await client.get(TRENDS_KEY);
    
    if (!trendsData) {
      // If no trends in Redis, generate new ones
      const user = req.user;
      const newTrends = await generateTrends(user);
      return res.json(newTrends);
    }
    const finalData = JSON.parse(trendsData)
    
    res.status(200).json({ trend: finalData });
  } catch (error) {
    console.error('Error retrieving trends:', error);
    return res.status(500).json({ trendsData: 'Failed to retrieve trends' });
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
    console.error('Error refreshing trends:', error);
    return res.status(500).json({ message: 'Failed to refresh trends' });
  }
};

module.exports = {
  generateTrends,
  getTrends,
  refreshTrends
};