const { trendAnalyzerPromptTemplate } = require("../utils/promptTemplates");
const IORedis = require('ioredis');

// Redis connection
const redis = new IORedis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
  db: process.env.REDIS_DB || 0,
});

// Redis key for storing trends
const TRENDS_KEY = 'marketing:trends';
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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "x-ai/grok-4-fast:free",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const aiData = await aiRes.json();
    const trends = JSON.parse(aiData.choices[0].message.content);
    const cleaned = trends.choices[0].message.content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
    
    // Store trends in Redis with timestamp
    const trendsData = {
      data: cleaned,
      timestamp: new Date().toISOString(),
      generatedBy: user ? user.email : 'system'
    };
    
    await redis.set(TRENDS_KEY, JSON.stringify(trendsData));
    await redis.expire(TRENDS_KEY, TRENDS_EXPIRY);
    
    console.log('Trends generated and stored in Redis');
    return trendsData;
  } catch (error) {
    console.error('Error generating trends:', error);
    throw error;
  }
};

/**
 * Get trends from Redis
 */
const getTrends = async (req, res) => {
  try {
    const trendsData = await redis.get(TRENDS_KEY);
    
    if (!trendsData) {
      // If no trends in Redis, generate new ones
      const user = req.user;
      const newTrends = await generateTrends(user);
      return res.json(newTrends);
    }
    
    return res.json(JSON.parse(trendsData));
  } catch (error) {
    console.error('Error retrieving trends:', error);
    return res.status(500).json({ error: 'Failed to retrieve trends' });
  }
};

/**
 * Force refresh trends
 */
const refreshTrends = async (req, res) => {
  try {
    const user = req.user;
    const newTrends = await generateTrends(user);
    return res.json(newTrends);
  } catch (error) {
    console.error('Error refreshing trends:', error);
    return res.status(500).json({ error: 'Failed to refresh trends' });
  }
};

module.exports = {
  generateTrends,
  getTrends,
  refreshTrends
};