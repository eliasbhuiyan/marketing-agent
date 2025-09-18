const { captionGeneratorPromptTemplate, blogGeneratorPromptTemplate, keywordHashtagGeneratorPromptTemplate } = require("../utils/promptTemplates");

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

const BlogGenerator = async (req, res) => {
  try {
    const { blogTopic, blogLength, writingStyle, seoKeywords, numberOfHeadings, outputLanguage } = req.body;
    const pixabayResponse = await fetch(
      `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${encodeURIComponent(blogTopic + ',' + seoKeywords)}&image_type=photo&per_page=${numberOfHeadings}`
    );
    const pixabayData = await pixabayResponse.json();
    const images = {};
    if(pixabayData.hits.length > 0){
      pixabayData.hits.forEach((hit, index) => {
        images[`image${index + 1}`] = hit.webformatURL;
      });
    }
    
    const prompt = blogGeneratorPromptTemplate({ blogTopic, blogLength, writingStyle, seoKeywords, numberOfHeadings, outputLanguage, images});   
    
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
    res.status(200).json({ blog: data.choices[0].message.content });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
}
const KeywordHashtagGenerator = async (req, res) => {
  try {
    const { industry, platform, numKeywords } = req.body;

    const prompt = keywordHashtagGeneratorPromptTemplate({ industry, platform, numKeywords });

    const aiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tngtech/deepseek-r1t2-chimera:free",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await aiResponse.json();
    if(data.error) return res.status(500).json({message: "So many requests. Please try again."});
    
    const cleaned = data.choices[0].message.content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(cleaned);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { captionGenerator, BlogGenerator, KeywordHashtagGenerator };
