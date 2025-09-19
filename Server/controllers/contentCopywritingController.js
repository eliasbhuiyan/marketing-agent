const { captionGeneratorPromptTemplate, blogGeneratorPromptTemplate, keywordHashtagGeneratorPromptTemplate, productDescriptionPromptTemplate } = require("../utils/promptTemplates");

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
    if(data.error) return res.status(500).json({message: "So many requests. Please try again."});    
    res.status(200).json({ caption: data.choices[0].message.content });

  } catch (error) {    
    res.status(500).json({ message: 'Internal server error' });
  }
};

const BlogHeadingImages = async (req, res) =>{
  try {
    const { blogTopic, writingStyle, seoKeywords, numberOfHeadings, outputLanguage } = req.body;

    // 1️⃣ Build AI prompt
    const prompt = `
    You are an expert content, blog writer and SEO specialist.

Generate ${numberOfHeadings} blog headings in ${outputLanguage} for the topic: "${blogTopic}" in ${writingStyle} style.
Use the provided SEO focus keywords where relevant: ${seoKeywords}.

Requirements:
1. The headings must be suitable for a complete blog structure.
2. Start with an **introductory heading** (e.g., "Introduction to …").
3. Include **main discussion headings** that cover different aspects of the topic.
4. End with a **conclusion or summary heading**.
5. Headings should be engaging, easy to understand, and broad enough for 2–3 paragraphs of content.
6. Do NOT make headings sound like technical reports or research papers.
7. For each heading, also suggest 2–3 short keywords that can be used to search for relevant images.

Respond strictly in JSON:
{
  "headings": [
    {
      "title": "Heading 1",
      "imageKeywords": ["keyword1", "keyword2"]
    }
  ]
}
    `;

    // 2️⃣ Call AI API (OpenRouter in your case)
    const aiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openrouter/sonoma-sky-alpha",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const aiData = await aiResponse.json();
    
    if(aiData.error) return res.status(500).json({message: "So many requests. Please try again."});

     const cleaned = aiData.choices[0].message.content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
      
    const parsedData = JSON.parse(cleaned);

    // 3️⃣ Fetch images from Pixabay for each heading
    const results = await Promise.all(
      parsedData.headings.map(async (heading) => {
        const query = heading.imageKeywords.join(" ");
        const pixabayRes = await fetch(
          `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=10`
        );
        const pixabayData = await pixabayRes.json();

        return {
          title: heading.title,
          images: pixabayData.hits.map((img) => img.webformatURL),
        };
      })
    );
    res.status(200).json({ headings: results });

  } catch (error) {
    console.error("Error in generateHeadingsController:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

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
    if(data.error) return res.status(500).json({message: "So many requests. Please try again."});
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
const productDescriptionGenerator = async (req, res) => {
  try {
    const { productName, keyFeatures, descriptionLength, includeKeywords, outputLanguage } = req.body;

    const prompt = productDescriptionPromptTemplate({ productName, keyFeatures, descriptionLength, includeKeywords, outputLanguage });

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
    res.status(200).json({description: data.choices[0].message.content});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { captionGenerator, BlogGenerator, KeywordHashtagGenerator, productDescriptionGenerator, BlogHeadingImages };
