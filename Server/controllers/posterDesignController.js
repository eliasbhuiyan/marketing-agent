const sharp = require("sharp");
const { posterDesignPromptTemplate } = require("../utils/promptTemplates");

const fileAccept = ["image/png", "image/jpg", "image/webp", "image/jpeg"]

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
  
  if(!fileAccept.includes(productFile.mimetype)){
   return res.status(400).json({ message: "Accept only png, jpg, jpeg and webp only. Upload a valid product image." });
  }
  if(!fileAccept.includes(modelFile.mimetype)){
   return res.status(400).json({ message: "Accept only png, jpg, jpeg and webp only. Upload a valid model image." });
  }

  
  const resizedProductBuffer = await sharp(productFile.buffer)
    .resize(240,) // fit: cover keeps aspect ratio, fills dimension
    .toBuffer();

  // Resize model image
  const resizedModelBuffer = await sharp(modelFile.buffer)
    .resize(240,)
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
//                 text: `You are an expert in commercial advertising and product photography.  
// Generate a high-quality marketing poster image using the following inputs: 
// - Style: professional, clean, and eye-catching design suitable for product marketing.  
// - Background: minimalistic, lifestyle, or studio lighting (choose what fits best for advertisements).  
// - Goal: make the product the hero of the image while looking natural on the model.  
// - Ensure realistic blending of the product on the model, correct lighting, shadows, and proportions.  
// - Add a soft commercial feel, suitable for social media ads, posters, or e-commerce stores. 
// - Clear focus on the product and model, avoiding distractions. 
// - Output Image size: 515x918 pixels. After generating the image, describe the generated scene **in 1-2 sentences only**,
// **Do not include greetings, extra commentary, or phrases like "Sounds like a great project" or "Here's a high-quality image".**
// Do not add text or logos, only the model wearing/using the product in a professional scene.  
// Product image and model image are given below:
// `,
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
  
res.status(200).json({image: base64ProductImg, description: "A high-quality marketing poster image for the water bottle, with the product looking natural on the model in a professional and eye-catching design"});

  // } catch (error) {
  //   console.error("Error in posterDesignController:", error);
  //   res.status(500).json({ message: "Internal server error....." });
  // }
};

module.exports = { posterDesignController };
