const sharp = require("sharp");
const {
  scriptWriterPromptTemplate,
  thumbnailGeneratorPromptTemplate,
} = require("../utils/promptTemplates");
const CreditsForTask = require("../utils/RequiredCredits");
const {
  checkAndDeductCredits,
  returnedCredits,
} = require("../utils/checkCredits");
const { CreateUsageHistory } = require("../services/createUsageHistory");
const { saveImageToLibrary } = require("../services/libraryService");

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
    if (
      !videoTopic ||
      !videoLength ||
      !targetAudience ||
      !videoGoal ||
      !tone ||
      !outputLanguage
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const REQUIRED_CREDITS = CreditsForTask.scriptWriter;
    // 1️⃣ Check if user has enough credits and deduct
    const check = await checkAndDeductCredits(
      req.user.brandId,
      REQUIRED_CREDITS
    );
    if (!check)
      return res.status(500).json({ message: "Insufficient credits" });
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "x-ai/grok-4-fast:free",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const aiData = await aiRes.json();
    if (aiData.error) {
      await returnedCredits(req.user.brandId, REQUIRED_CREDITS);
      return res
        .status(500)
        .json({ message: "So many requests. Please try again." });
    }

    const script = aiData.choices[0].message.content;

    // Create usage history
    await CreateUsageHistory(
      req.user.brandId,
      req.user.id,
      "script_writer",
      { text: script },
      REQUIRED_CREDITS,
      "completed"
    );
    res.status(200).json({
      success: true,
      script,
    });
  } catch (error) {
    console.error("Script Writer Error:", error);
    res.status(500).json({ message: "Failed to generate script." });
  }
};

const fileAccept = ["image/png", "image/jpg", "image/webp", "image/jpeg"];
const thumbnailGeneratorController = async (req, res) => {
  try {
    const {
      headlineText,
      subheadingText,
      videoDescription,
      style,
      colorScheme,
    } = req.body;
    const uploadedFile = req.file;

    if (!fileAccept.includes(uploadedFile.mimetype)) {
      return res.status(400).json({
        message:
          "Accept only png, jpg, jpeg and webp only. Upload a valid product image.",
      });
    }
    const resizedModelBuffer = await sharp(uploadedFile.buffer)
      .resize(240)
      .toBuffer();

    const base64ModelImg = `data:${
      uploadedFile.mimetype
    };base64,${resizedModelBuffer.toString("base64")}`;
    res.status(200).json({
      thumbnail: base64ModelImg,
    });

    const REQUIRED_CREDITS = CreditsForTask.thumbnailGenerator;
    // 1️⃣ Check if user has enough credits and deduct
    const check = await checkAndDeductCredits(
      req.user.brandId,
      REQUIRED_CREDITS
    );
    if (!check)
      return res.status(500).json({ message: "Insufficient credits" });

    const prompt = thumbnailGeneratorPromptTemplate({
      headlineText,
      subheadingText,
      videoDescription,
      style,
      colorScheme,
    });
    // Call AI API
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AI_IMG_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000/youtube/thumbnail",
          "X-Title": "Thumbnail",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image-preview",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: prompt,
                },
                {
                  type: "image_url",
                  image_url: {
                    url: base64ModelImg,
                  },
                },
              ],
            },
          ],
        }),
      }
    );
    const result = await response.json();

    if (result.error) {
      await returnedCredits(req.user.brandId, REQUIRED_CREDITS);
      return res
        .status(500)
        .json({ message: "So many requests. Please try again." });
    }

    let cloudRes = await cloudinary.uploader.upload(
      result.choices[0].message.images[0].image_url.url,
      {
        folder: `margenai/${req.user.brandId}/thumbnails`,
      }
    );
    saveImageToLibrary(req.user.brandId, cloudRes.secure_url, "thumbnail_generator");

    // Create usage history
    await CreateUsageHistory(
      req.user.brandId,
      req.user.id,
      "thumbnail_generator",
      {
        image: cloudRes.secure_url,
        text: result.choices[0].message.content,
      },
      REQUIRED_CREDITS,
      "completed"
    );
    res.status(200).json({
      thumbnail: result.choices[0].message.images[0].image_url.url,
      description: result.choices[0].message.content,
    });
  } catch (error) {
    console.error("Thumbnail Generator Error:", error);
    res
      .status(500)
      .json({ message: "Failed to generate thumbnail description." });
  }
};

module.exports = {
  scriptWriterController,
  thumbnailGeneratorController,
};
