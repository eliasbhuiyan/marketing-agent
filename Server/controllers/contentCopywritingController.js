const {
  CreateUsageHistory,
  updateUsageHistory,
} = require("../services/createUsageHistory");
const {
  checkAndDeductCredits,
  returnedCredits,
} = require("../utils/checkCredits");
const {
  captionGeneratorPromptTemplate,
  blogGeneratorPromptTemplate,
  keywordHashtagGeneratorPromptTemplate,
  productDescriptionPromptTemplate,
  blogHeadingPromptTemplate,
} = require("../utils/promptTemplates");
const CreditsForTask = require("../utils/RequiredCredits");

const captionGenerator = async (req, res) => {
  try {
    const { productDescription, targetAudience, tone, platform, language } =
      req.body;
    // Validate input
    if (
      !productDescription ||
      !targetAudience ||
      !tone ||
      !platform ||
      !language
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const REQUIRED_CREDITS = CreditsForTask.captionGenerator;

    // 1️⃣ Check if user has enough credits and deduct
    const check = await checkAndDeductCredits(
      req.user.brandId,
      REQUIRED_CREDITS
    );
    if (!check)
      return res.status(500).json({ message: "Insufficient credits" });

    // Create usage history
    const usageHistoryId = await CreateUsageHistory(
      req.user.brandId,
      req.user.id,
      "caption",
      { text: productDescription },
      REQUIRED_CREDITS
    );
    const prompt = captionGeneratorPromptTemplate({
      productDescription,
      targetAudience,
      tone,
      platform,
      language,
    });

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
          model: "x-ai/grok-4-fast:free",
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

    if (data.error) {
      // Update usage history status to failed if AI call fails
      await updateUsageHistory(usageHistoryId, "failed");
      await returnedCredits(req.user.brandId, REQUIRED_CREDITS);
      return res
        .status(500)
        .json({ message: "So many requests. Please try again." });
    }
    // Update usage history status to completed if AI call is successful
    await updateUsageHistory(usageHistoryId, "completed");
    res.status(200).json({ caption: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const BlogHeadingImages = async (req, res) => {
  try {
    const {
      blogTopic,
      writingStyle,
      seoKeywords,
      numberOfHeadings,
      outputLanguage,
    } = req.body;
    if (
      !blogTopic ||
      !writingStyle ||
      !seoKeywords ||
      !numberOfHeadings ||
      !outputLanguage
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const REQUIRED_CREDITS = CreditsForTask.blogHeadingGenerator;

    // 1️⃣ Check if user has enough credits and deduct
    const check = await checkAndDeductCredits(
      req.user.brandId,
      REQUIRED_CREDITS
    );
    if (!check)
      return res.status(500).json({ message: "Insufficient credits" });

    // Create usage history
    const usageHistoryId = await CreateUsageHistory(
      req.user.brandId,
      req.user.id,
      "blog_headings",
      { text: `Blog Headings: ${blogTopic}` },
      REQUIRED_CREDITS
    );
    // 1️⃣ Build AI prompt
    const prompt = blogHeadingPromptTemplate({
      blogTopic,
      writingStyle,
      seoKeywords,
      numberOfHeadings,
      outputLanguage,
    });

    // 2️⃣ Call AI API (OpenRouter in your case)
    const aiResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "x-ai/grok-4-fast:free",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    const aiData = await aiResponse.json();
    console.log(aiData.error);

    if (aiData.error) {
      // Update usage history status to failed if AI call fails
      await updateUsageHistory(usageHistoryId, "failed");
      // Return deducted credits
      await returnedCredits(req.user.brandId, REQUIRED_CREDITS);
      return res
        .status(500)
        .json({ message: "So many requests. Please try again." });
    }

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
          `https://pixabay.com/api/?key=${
            process.env.PIXABAY_KEY
          }&q=${encodeURIComponent(query)}&image_type=photo&per_page=15`
        );
        const pixabayData = await pixabayRes.json();

        return {
          title: heading.title,
          images: pixabayData.hits.map((img) => img.previewURL),
          downLoadImageLink: pixabayData.hits.map((img) => img.webformatURL),
        };
      })
    );

    // Update usage history status to completed if AI call is successful
    await updateUsageHistory(usageHistoryId, "completed");
    res.status(200).json({ headings: results });
  } catch (error) {
    console.error("Error in generateHeadingsController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const BlogGenerator = async (req, res) => {
  try {
    const {
      blogTopic,
      blogLength,
      writingStyle,
      seoKeywords,
      outputLanguage,
      headings,
    } = req.body;

    const REQUIRED_CREDITS = CreditsForTask.blogGenerator;

    // 1️⃣ Check if user has enough credits and deduct
    const check = await checkAndDeductCredits(
      req.user.brandId,
      REQUIRED_CREDITS
    );
    if (!check)
      return res.status(500).json({ message: "Insufficient credits" });

    // Create usage history
    const usageHistoryId = await CreateUsageHistory(
      req.user.brandId,
      req.user.id,
      "blog",
      { text: `Blog: ${blogTopic}` },
      REQUIRED_CREDITS
    );

    const prompt = blogGeneratorPromptTemplate({
      blogTopic,
      blogLength,
      writingStyle,
      seoKeywords,
      outputLanguage,
      headings,
    });

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
          model: "x-ai/grok-4-fast:free",
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

    if (data.error) {
      // Update usage history status to failed if AI call fails
      await updateUsageHistory(usageHistoryId, "failed");
      // Return deducted credits
      await returnedCredits(req.user.brandId, REQUIRED_CREDITS);
      return res
        .status(500)
        .json({ message: "So many requests. Please try again." });
    }
    // Update usage history status to completed if AI call is successful
    await updateUsageHistory(usageHistoryId, "completed");
    res.status(200).json({ blog: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const KeywordHashtagGenerator = async (req, res) => {
  try {
    const { industry, platform, numKeywords } = req.body;
    if (!industry || !platform || !numKeywords) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const REQUIRED_CREDITS = CreditsForTask.keywordHashtagGenerator;

    // 1️⃣ Check if user has enough credits and deduct
    const check = await checkAndDeductCredits(
      req.user.brandId,
      REQUIRED_CREDITS
    );
    if (!check)
      return res.status(500).json({ message: "Insufficient credits" });

    // Create usage history
    const usageHistoryId = await CreateUsageHistory(
      req.user.brandId,
      req.user.id,
      "keyword_hashtag",
      { text: `Hashtag & keyword: ${industry}` },
      REQUIRED_CREDITS
    );

    const prompt = keywordHashtagGeneratorPromptTemplate({
      industry,
      platform,
      numKeywords,
    });

    const aiResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "x-ai/grok-4-fast:free",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    const data = await aiResponse.json();
    if (data.error)
      return res
        .status(500)
        .json({ message: "So many requests. Please try again." });

    const cleaned = data.choices[0].message.content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(cleaned);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const productDescriptionGenerator = async (req, res) => {
  try {
    const {
      productName,
      keyFeatures,
      descriptionLength,
      includeKeywords,
      outputLanguage,
    } = req.body;

    const prompt = productDescriptionPromptTemplate({
      productName,
      keyFeatures,
      descriptionLength,
      includeKeywords,
      outputLanguage,
    });

    const aiResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "x-ai/grok-4-fast:free",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    const data = await aiResponse.json();
    if (data.error)
      return res
        .status(500)
        .json({ message: "So many requests. Please try again." });
    res.status(200).json({ description: data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  captionGenerator,
  BlogGenerator,
  KeywordHashtagGenerator,
  productDescriptionGenerator,
  BlogHeadingImages,
};
