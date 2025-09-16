const { posterDesignPromptTemplate } = require("../utils/promptTemplates");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyDqyKPIkQqG3OxzIy-w6szbnCJTtbYFoCM");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image" }); // Or "nano-banana" if that's the specific alias
const fs = require("fs");

const posterDesignController = async (req, res) => {
      
    try {
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

        const base64ProductImg = productFile.buffer.toString("base64");
        const base64ModelImg = modelFile.buffer.toString("base64");

        const productImagePart = {
          inlineData: {
            mimeType: productFile.mimetype || "image/jpeg",
            data: base64ProductImg,
          },
        };
        const modelImagePart = {
          inlineData: {
            mimeType: modelFile.mimetype || "image/jpeg",
            data: base64ModelImg,
          },
        };

    const prompt = posterDesignPromptTemplate();

    const result = await model.generateContent([
      prompt,
      productImagePart,
      modelImagePart,
    ]); // Include imagePart if doing image-to-image
    const response = await result.response;
    // Depending on SDK, adapt how you read the generated output
    // For now, return a success message with sizes to confirm receipt
    return res.status(200).json({
      message: "Images received and processed",
      productBytes: productFile.size,
      modelBytes: modelFile.size,
    });
  } catch (error) {
    console.error("Error in posterDesignController:", error);
    res.status(500).json({ message: "Internal server error....." });
  }
};

module.exports = { posterDesignController };
