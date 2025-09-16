const { posterDesignPromptTemplate } = require("../utils/promptTemplates");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyDqyKPIkQqG3OxzIy-w6szbnCJTtbYFoCM");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image" }); // Or "nano-banana" if that's the specific alias
const fs = require("fs");

const posterDesignController = async (req, res) => {
      
    try {
        const { productImg, modelImg } = req.files;
        console.log(req.files);
        return
        
        const productImgPath = productImg[0].path;
        const modelImgPath = modelImg[0].path;
        console.log(productImgPath);
        console.log(modelImgPath);  
        return
        
    if (!productImg || !modelImg) {
      return res
        .status(400)
        .json({ message: "Product image and model image are required." });
    }

    function imageToBase64(imagePath) {
      const imageBuffer = fs.readFileSync(imagePath);
      return imageBuffer.toString("base64");
    }

    const base64ProductImg = imageToBase64(productImgPath);
    console.log(base64ProductImg);
    const base64ModelImg = imageToBase64(modelImgPath);
    const productImagePart = {
      inlineData: {
        mimeType: "image/jpeg", // Adjust mimeType as needed
        data: base64ProductImg,
      },
    };
    const modelImagePart = {
      inlineData: {
        mimeType: "image/jpeg", // Adjust mimeType as needed
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
    const generatedContent = response.blob(); // Or access image data if the model returns images
    console.log(generatedContent);
  } catch (error) {
    console.error("Error in posterDesignController:", error);
    res.status(500).json({ message: "Internal server error....." });
  }
};

module.exports = { posterDesignController };
