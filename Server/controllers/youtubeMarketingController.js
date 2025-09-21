const { scriptWriterPromptTemplate } = require("../utils/promptTemplates");

const scriptWriterController = async (req, res) => {
  
  try {
    const {
      videoTopic,
      videoLength,
      targetAudience,
      videoGoal,
      tone,
      outputLanguage,
    } = req.body;
    if (!videoTopic || !videoLength || !targetAudience || !videoGoal || !tone || !outputLanguage) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Build AI prompt
    const prompt = scriptWriterPromptTemplate({
      videoTopic,
      videoLength,
      targetAudience,
      videoGoal,
      tone,
      outputLanguage,
    });

    // Call AI API
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
    const script = aiData.choices[0].message.content;

    res.status(200).json({
      success: true,
      script,
    });

  } catch (error) {
    console.error("Script Writer Error:", error);
    res.status(500).json({ message: "Failed to generate script." });
  }
};

module.exports = {
  scriptWriterController,
}