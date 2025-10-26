const sharp = require("sharp");
const { vertualTryOnPromptTemplate } = require("../utils/promptTemplates");
const cloudinary = require("../services/cloudinary");
const CreditsForTask = require("../utils/RequiredCredits");
const {
  checkAndDeductCredits,
  returnedCredits,
} = require("../utils/checkCredits");
const { CreateUsageHistory } = require("../services/createUsageHistory");
const { saveImageToLibrary } = require("../services/libraryService");
const fileAccept = ["image/png", "image/jpg", "image/webp", "image/jpeg"];
const virtualTryOnController = async (req, res) => {
  try {
    const { customPrompt } = req.body;
    const files = req.files || {};
    const assetsArr = files.assets || [];
    const modelArr = files.model || [];

    // Using multer memory storage buffers
    const modelFile = modelArr[0];

    // Validate inputs
    if (!modelFile || assetsArr.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Model image and at least one asset are required",
      });
    }
    // Resize model image
    const resizedModelBuffer = await sharp(modelFile.buffer)
      .resize(240)
      .toBuffer();

    const base64ModelImg = `data:${
      modelFile.mimetype
    };base64,${resizedModelBuffer.toString("base64")}`;

    // Process each asset image
    const processedAssets = await Promise.all(
      assetsArr.map(async (assetFile) => {
        // Validate asset file type
        if (!fileAccept.includes(assetFile.mimetype)) {
          res.status(400).json({
            message: `Invalid asset file type: ${
              assetFile.mimetype
            }. Accepted types are: ${fileAccept.join(", ")}`,
          });
        }

        // Resize asset image
        const resizedAssetBuffer = await sharp(assetFile.buffer)
          .resize(240)
          .toBuffer();

        return `data:${assetFile.mimetype};base64,${resizedAssetBuffer.toString(
          "base64"
        )}`;
      })
    );

    const assetsAPIPayload = processedAssets.map((asset) => ({
      type: "image_url",
      image_url: {
        url: asset,
      },
    }));

    const REQUIRED_CREDITS = CreditsForTask.virtualTryOn;
    // 1️⃣ Check if user has enough credits and deduct
    const check = await checkAndDeductCredits(
      req.user.brandId,
      REQUIRED_CREDITS
    );
    if (!check)
      return res.status(500).json({ message: "Insufficient credits" });

    const prompt = vertualTryOnPromptTemplate(customPrompt);

    const contentArr = [
      ...assetsAPIPayload,
      {
        type: "image_url",
        image_url: {
          url: base64ModelImg,
        },
      },
      {
        type: "text",
        text: prompt,
      },
    ];

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AI_IMG_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000/virtualtryon", // Optional. Site URL for rankings on openrouter.ai.
          "X-Title": "Virtual Try On", // Optional. Site title for rankings on openrouter.ai.
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image-preview",
          messages: [
            {
              role: "user",
              content: contentArr,
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
        folder: `margenai/${req.user.brandId}/virtualtryon`,
      }
    );
    saveImageToLibrary(req.user.brandId, cloudRes.secure_url, "virtual_try-on");

    // Create usage history
    await CreateUsageHistory(
      req.user.brandId,
      req.user.id,
      "virtual_try-on",
      {
        image: result.choices[0].message.images[0].image_url.url,
        text: result.choices[0].message.content,
      },
      REQUIRED_CREDITS,
      "completed"
    );
    //   // Return the result to the client
    res.status(200).json({
      image: result.choices[0].message.images[0].image_url.url,
      description: result.choices[0].message.content,
    });
    // res.status(200).json({
    //   success: true,
    //   message: "Virtual try-on processed successfully",
    // });
  } catch (error) {
    console.error("Error in virtual try-on:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = virtualTryOnController;
