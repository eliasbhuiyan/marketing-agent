const { posterDesignPromptTemplate } = require("../utils/promptTemplates");
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const genAI = new GoogleGenerativeAI("AIzaSyDqyKPIkQqG3OxzIy-w6szbnCJTtbYFoCM");
// const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image-preview" }); // Or "nano-banana" if that's the specific alias
// const fs = require("fs");

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

    const base64ProductImg = `data:${productFile.mimetype};base64,${productFile.buffer.toString("base64")}`;
    const base64ModelImg = `data:${modelFile.mimetype};base64,${modelFile.buffer.toString("base64")}`;


    const prompt = posterDesignPromptTemplate();
   
    const response = await fetch(
      "https://router.huggingface.co/replicate/v1/models/qwen/qwen-image-edit/predictions",
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          input: {
            image: base64ProductImg,
            mask: base64ModelImg,
            prompt: prompt
          }
        }),
      }
    );
    // const result = await response.json();
    console.log(response); return
    
    // Return the result to the client
    res.status(response.status).json(result);
  } catch (error) {
    console.error("Error in posterDesignController:", error);
    res.status(500).json({ message: "Internal server error....." });
  }
};

module.exports = { posterDesignController };
