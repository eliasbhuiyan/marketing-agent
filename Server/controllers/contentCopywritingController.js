const { captionGeneratorPromptTemplate } = require("../utils/promptTemplates");

const captionGenerator = async (req, res) => {
  try {
    const { productDescription, targetAudience, tone, platform } = req.body;
 
    const prompt = captionGeneratorPromptTemplate({ productDescription, targetAudience, tone, platform});

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AI_API_KEY}`,
          // "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
          // "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "tngtech/deepseek-r1t2-chimera:free",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );
    const data = await response.json();
    res.status(200).json({ caption: data.choices[0].message.content });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { captionGenerator };
