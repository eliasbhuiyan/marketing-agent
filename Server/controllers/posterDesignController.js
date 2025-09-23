const sharp = require("sharp");
const { posterDesignPromptTemplate, posterCaptionPromptTemplate } = require("../utils/promptTemplates");

const fileAccept = ["image/png", "image/jpg", "image/webp", "image/jpeg"];

const posterDesignController = async (req, res) => {
  // try {
  console.log("api hit");
  const { customPrompt } = req.body;
  const files = req.files || {};
  const productArr = files.productImg || [];
  const modelArr = files.modelImg || [];
  if (productArr.length === 0 || modelArr.length === 0) {
    return res
      .status(400)
      .json({ message: "Product image and model image are required." });
  }

  // Using multer memory storage buffers
  const productFile = productArr[0];
  const modelFile = modelArr[0];

  if (!fileAccept.includes(productFile.mimetype)) {
    return res
      .status(400)
      .json({
        message:
          "Accept only png, jpg, jpeg and webp only. Upload a valid product image.",
      });
  }
  if (!fileAccept.includes(modelFile.mimetype)) {
    return res
      .status(400)
      .json({
        message:
          "Accept only png, jpg, jpeg and webp only. Upload a valid model image.",
      });
  }

  const resizedProductBuffer = await sharp(productFile.buffer)
    .resize(240) // fit: cover keeps aspect ratio, fills dimension
    .toBuffer();

  // Resize model image
  const resizedModelBuffer = await sharp(modelFile.buffer)
    .resize(240)
    .toBuffer();

  const base64ProductImg = `data:${
    productFile.mimetype
  };base64,${resizedProductBuffer.toString("base64")}`;
  const base64ModelImg = `data:${
    modelFile.mimetype
  };base64,${resizedModelBuffer.toString("base64")}`;

  const prompt = posterDesignPromptTemplate();

  //   const response = await fetch(
  //     "https://openrouter.ai/api/v1/chat/completions",
  //     {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${process.env.AI_IMG_API_KEY}`,
  //         "HTTP-Referer": "http://localhost:3000", // Optional. Site URL for rankings on openrouter.ai.
  //         "X-Title": "Marketing Agent", // Optional. Site title for rankings on openrouter.ai.
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         model: "google/gemini-2.5-flash-image-preview",
  //         messages: [
  //           {
  //             role: "user",
  //             content: [
  //               {
  //                 type: "text",
  //                 text: prompt,
  //               },
  //               {
  //                 type: "text",
  //                 text: customPrompt || "",
  //               },
  //               {
  //                 type: "image_url",
  //                 image_url: {
  //                   url: base64ProductImg,
  //                 },
  //               },
  //               {
  //                 type: "image_url",
  //                 image_url: {
  //                   url: base64ModelImg,
  //                 },
  //               },
  //             ],
  //           },
  //         ],
  //       }),
  //     }
  //   );
  //   const result = await response.json();
  //   //     console.log("full response",result);
  //   console.log("content", result.choices[0].message);

  //   // Return the result to the client
  //   res
  //     .status(200)
  //     .json({
  //       image: result.choices[0].message.images[0].image_url.url,
  //       description: result.choices[0].message.content,
  //     });

  res
    .status(200)
    .json({
      image: base64ProductImg,
      description:
        "A heigh quality water bottle",
    });

  // } catch (error) {
  //   console.error("Error in posterDesignController:", error);
  //   res.status(500).json({ message: "Internal server error....." });
  // }
};
const posterCaptionGenerator = async (req, res) => {
  try {
    const { productDescription, tone, platform, keywords, language } = req.body;
    const prompt = posterCaptionPromptTemplate({
      productDescription,
      tone,
      platform,
      keywords,
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
    if (data.error)
      return res
        .status(500)
        .json({ message: "So many requests. Please try again." });

    res.status(200).json({ caption: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { posterDesignController, posterCaptionGenerator };
