const posterDesignPromptTemplate = () => {
  return `
  You are a professional commercial advertising and product photography. Create a high-quality, visually appealing product poster for social media marketing.
Requirements:
1. **Images**
    - Include the **product image** prominently.
   - Include the **model image**.
   - Remove unnecessary background and make images blend naturally.
2. **Layout & Composition**
   - Follow a modern, clean, and professional layout.
   - Ensure the product and the model are the main focus.
   - Model can complement the scene without overpowering the product.
   - Maintain proper alignment, spacing, and balance.
   - The model must be holding, wearing, or interacting with the product in a visually engaging and high-quality way.
5. **Background & Effects**
   - Use a clean, minimalistic background or gradient if needed.
   - Add subtle shadows or highlights to make product stand out.
   - Avoid clutter and keep it visually appealing.
6. **Format & Output**
   - Poster resolution suitable for social media, Output Image size: 515x918 pixels. After generating the image describe about the product **in few words**, (e.g., A heigh quality water bottle"),  **Do not include greetings, extra commentary, or phrases.
   - Output a **single high-quality image** ready for download, never generate multiple image.
7. **Mood / Tone**
   - Professional, modern, engaging, and visually appealing.
   - Emphasize the product as premium and desirable.
`;
};
const posterCaptionPromptTemplate = ({
  productDescription,
  tone,
  platform,
  keywords,
  language,
}) => {
  return `You are a professional social media copywriter. 
Write a creative, engaging, and persuasive caption for a post based on the following information:
Product/Service Description: ${productDescription},
Tone: ${tone},
Platform: ${platform},
Keywords: ${keywords}, (must naturally appear in the caption)
Language: ${language}, (write the final caption in this language only)
Requirements:
- Start with a short attention-grabbing hook. 
- Caption must highlight **product features, quality, and uniqueness** in section wyse.
- The caption must suit the platform: ${platform} style.
- Make it concise and attention-grabbing in 1500-2500 characters.
- Avoid using overly generic phrases; make it unique and relatable to the customers.
- If a discount/offer is provided, highlight it naturally.  
- End with a soft call-to-action.
Output ONLY the caption text.`;
};
const IntelligentPosterDesignPromptTemplate = ({
  title,
  subtitle,
  infoBlocks,
  dateInfo,
  ctaText,
  contactInfo,
  colors,
}) => {
  return `
  You are a professional AI poster designer.
Your task is to design a visually stunning and balanced poster using the provided text and assets.
User Inputs:
{
"title": "${title}",
"subtitle": "${subtitle}",
"infoBlocks": "${infoBlocks}",
"dateInfo": "${dateInfo}",
"ctaText": "${ctaText}",
"contactInfo": "${contactInfo}",
"colorScheme": "${colors}",
"logo": "Provided as image below",
}
Design Logic:
Auto Layout Selection:
If the text is short (title + 1–2 lines), use a center-focused layout with bold typography.
If medium text (3–5 blocks), use a two-section layout with icons or shapes.
If detailed text (more than 5 blocks), use a grid or card-style layout for clarity.
Typography & Hierarchy:
Make the main title visually dominant.
Use subtle font contrast for subtitles and info.
Maintain consistent spacing and alignment.
Composition Rules:
Apply smart text placement ensuring no overlaps or crowding.
Keep visual balance between top, middle, and bottom.
Auto-position the logo at a clean corner (top-left or bottom-right).
**Do NOT redraw, regenerate, or alter the logo**.
Highlight the CTA using color or button effect.
Visual Style:
Follow the theme and color scheme naturally.
Use 3D illustrations, geometric shapes, gradients, and lighting when relevant.
Use cartoon-style or 3D character illustrations that match the theme.
Blend character illustration naturally into the layout.
Blend colors with harmony; avoid clashing hues.
Output Specs:
Ready-to-use poster design suitable for social media, campaigns, or events.
Text and layout must remain fully readable, well-balanced, and aesthetic.
After generating the image describe about the poster **in few words**, (e.g., poster design for your "MERN Stack dev"), **Do not include greetings, extra commentary, or phrases.
Goal:
Generate a professionally designed marketing poster that visually matches the provided text, follows brand consistency, and auto-adjusts layout and typography smartly — like a human designer would.`;
};
const captionGeneratorPromptTemplate = ({
  productDescription,
  targetAudience,
  tone,
  platform,
  language,
}) => {
  return `
   You are a professional social media copywriter. 
Write a creative, engaging, and persuasive caption for a post based on the following information:
Product/Service Description: ${productDescription},
Tone: ${tone},
Platform: ${platform},
Language: ${language}, (write the final caption in this language only)
Target Audience: ${targetAudience},
Requirements:
- Start with a short attention-grabbing hook. 
- Caption must highlight **product features, quality, and uniqueness** in section wyse.
- The caption must suit the platform: ${platform} style.
- Make it concise and attention-grabbing in 1500-2500 characters.
- Avoid using overly generic phrases; make it unique and relatable to the customers.
- If a discount/offer is provided, highlight it naturally.  
- End with a soft call-to-action.
Output ONLY the caption text.
   `;
};

const blogHeadingPromptTemplate = ({
  blogTopic,
  writingStyle,
  seoKeywords,
  numberOfHeadings,
  outputLanguage,
}) => {
  return `You are an expert content, blog writer and SEO specialist.
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
}`;
};
const blogGeneratorPromptTemplate = ({
  blogTopic,
  blogLength,
  writingStyle,
  seoKeywords,
  outputLanguage,
  headings,
}) => {
  return `You are an expert content writer and SEO specialist. 
Write a high-quality, **human-like** blog based on the following details:
Blog Topic: ${blogTopic}
Blog Length: ${blogLength} words
Writing Style: ${writingStyle}
Output Language: ${outputLanguage}
SEO Focus Keywords: ${seoKeywords} (and use others relevant if needed)
Confirmed Headings and Images: ${JSON.stringify(headings)}
Requirements:
- Output ONLY valid HTML fragment (no surrounding <html> or <body> tags). Do not include any other text. 
- Use only these HTML tags: <h1>, <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <a>, <img>, <blockquote>, <figure>, <figcaption>. Do not use <style>, <script>, or inline JavaScript.
- Start with a top-level title using <h1> containing the Blog Topic.
- Include an introduction section (1–2 <p> elements).
- For each confirmed heading:
   1. Use the heading title inside an <h2>.
   2. Immediately insert the confirmed image below it as:
      <img src="imageLink" alt="Heading title"/>
   3. Write 1–3 <p> paragraphs under each heading. Each paragraph should be short: roughly 3–4 lines (2–5 sentences).
- Integrate SEO keywords naturally and sparingly throughout the content; avoid keyword stuffing.
- After the conclusion, add a heading for the FAQ section exactly as: 
   <h2>FAQ in (blog topic here)</h2>
- Under the FAQ heading include at least 4 Q&A entries relevant and trendy to the topic. 
   Format each Q&A as:
   <h3>Question text?</h3>
   <p>Answer text.</p>
- Each FAQ answer should be concise (1–3 short paragraphs). Provide practical or up-to-date context where appropriate.
- Do NOT include decorative dashes, "---", markdown, or any meta commentary. 
- Ensure links (<a>) include meaningful anchor text and absolute URLs (placeholders are fine).
- Output must be clean, well-formed HTML that can be inserted directly into a rich-text editor.

Output only the complete blog content.`;
};

const keywordHashtagGeneratorPromptTemplate = ({
  industry,
  platform,
  numKeywords,
}) => {
  return `
  You are a social media and SEO expert.
  Inputs:
  - Industry/Niche: ${industry}
  - Platform: ${platform}
  - Number of Keywords: ${numKeywords}

  Task:
  1. Generate three categories:
  - Frequent Keywords → High search/competition, hard to rank, popular
  - Average Keywords → Medium search/competition, medium difficulty
  - Rare Keywords → Low search, easy to rank, niche-specific
  2. Each category must include:
     - keywords: relevant keywords
     - hashtags: relevant hashtags
  3. Output must be JSON in this format:
  {
    "frequent": { "keywords": [], "hashtags": [] },
    "average": { "keywords": [], "hashtags": [] },
    "rare": { "keywords": [], "hashtags": [] }
  }
  4. Make keywords relevant to ${industry} and trending on ${platform}.
  5. All hashtags must be inside double quotes like "#example".
  Output must be ONLY valid JSON.
  Do not include \`\`\`json or any other text, just pure JSON.
  `;
};

const productDescriptionPromptTemplate = ({
  productName,
  keyFeatures,
  descriptionLength,
  includeKeywords,
  outputLanguage,
}) => {
  return `
  You are a professional e-commerce product description writer.  
Write a compelling and SEO-optimized product description for the following product.  

Details:  
- Product Name: ${productName}  
- Key Features: ${keyFeatures}  
- Desired Length: ${descriptionLength} (short, medium, or long)  
- Must Include Keywords: ${includeKeywords}  
- Output Language: ${outputLanguage}  

Requirements:  
1. Start with a catchy opening sentence that highlights the main benefit.  
2. Expand on the key features in a way that appeals to the target audience.  
3. Naturally integrate the given keywords for SEO.  
4. Maintain a persuasive, customer-focused tone.  
5. Write the final output fully in ${outputLanguage}.  
6. Write the description in a way that is easy to read and **promotional tone**.
7. End with a soft call-to-action (e.g., “Order now and experience the difference!”).  

Output only the description text.
Do not include \`\`\`json or any other text, just pure text.
  `;
};

const trendAnalyzerPromptTemplate = () => {
  return `You are an expert business trend analyst and marketing strategist. 
Your task is to generate **trendy, actionable ideas, tips & tricks** for businesses. Follow these rules carefully:
Inputs:
- Industry/Topics: digital marketing, social media marketing, ai tools, small business ideas, ecommerce trends, customer engagement, business automation, content creation, productivity tools, branding strategy, online business growth, seo strategy, influencer marketing, email marketing, video marketing.
- Country: Bangladesh
- Output Language: Bangla

Requirements:
- Generate **10–15 trend ideas per industry**.
- Include hashtags suitable for social media marketing.  
- Keep the descriptions concise and actionable. 
- The tone should be energetic and social-media-friendly, like a creator’s post (use emojis, engaging language).
- Do NOT include any markdown, extra text, or commentary—only valid JSON.  
- Ensure JSON is well-formed and parseable.
- Output a **JSON array** like this exact structure:
[
  {
    "industry": "Industry Name",
    "description": "Brief description of the industry.",
    "trends": [
      {
        "title": "Trend Title",
        "description": "Short human-like description of the trend. 2–3 sentences max.",
        "hashtags": ["#tag1","#tag2"],
      },
      ...
    ]
  }
]

Output only the JSON array.`;
};

const scriptWriterPromptTemplate = ({
  videoTopic,
  videoLength,
  targetAudience,
  videoGoal,
  tone,
  outputLanguage,
}) => {
  return `You are an expert video scriptwriter. Your job is to create engaging scripts that match the user’s requirements.  
Details:  
- Video Topic/Product: ${videoTopic}  
- Target Audience: ${targetAudience}  
- Video Goal: ${videoGoal}  
- Desired Video Length: ${videoLength} Minutes  
- Tone: ${tone}  
- Language: ${outputLanguage}  

Instructions:  
1. Write the script in ${outputLanguage}.  
2. Match the tone to the input.
3. The script must fit approximately into the requested video length.
4. Start with a short attention-grabbing hook.  
5. Use natural flow — introduction → main message → CTA (call-to-action).  
6. If relevant, break into **sections/scenes** with narration/dialogue/camera direction.  
7. Ensure the message speaks directly to the target audience.  
8. End with a strong conclusion or call-to-action.  
9. Keep the script concise, engaging, and easy to follow.  

Final Output:  
Return only the script in clear formatting, with sections/scenes labeled if appropriate.  
`;
};
const thumbnailGeneratorPromptTemplate = ({
  headlineText,
  subheadingText,
  videoDescription,
  style,
  colorScheme,
}) => {
  return `You are a professional thumbnail designer.
Create a high-quality, visually dynamic thumbnail image using the following information:
- Brand color palette: ${colorScheme}
- Thumbnail style: ${style}
- Headline text: ${headlineText}
${subheadingText && `- Subheading text: ${subheadingText}`}
Design Intent:
- Make the **subject or model visually interact with the design**
presenting the product naturally.
- Blending partially into the design with dynamic lighting and color matching.
- Create **depth** with layered composition — foreground subject, middle text, and glowing background.
- Emphasize **emotion and action** — expressions like excitement, surprise, or focus.
- Use **cinematic lighting** with brand-color accents.
- Use necessary icons related to the thumbnail topic
- Add **3D shadow, reflection, and light flares** for realism.
- Headline text should be **bold, 3D, with shadow and color contrast**.
- Background should be **clean, slightly blurred**, and **color-matched** to brand or content theme.
- Include **motion or dynamic energy lines** subtly for visual flow.
- For product-based thumbnails, show **interaction** (hand holding, gaze direction, spotlight on product).
- ${videoDescription}
Final Output:
A click-worthy, cinematic thumbnail (16:9 or Youtube aspect ratio) with realistic interaction between the subject and thumbnail elements, designed to grab attention instantly.`;
};
const vertualTryOnPromptTemplate = (customPrompt) => {
  return `You are a professional fashion image editor and virtual try-on designer.
Generate a realistic, high-quality image of the person wearing the provided fashion assets.

Design Intent:
1. Preserve the model’s **face, skin tone, hairstyle, pose, and body proportions** exactly.
2. Dress the model naturally with the uploaded clothing and accessories.
3. Ensure **realistic fabric fitting** — shirts follow body contours, pants align with legs, shoes fit properly.
4. Maintain **correct lighting and shadows** on all items to match the model’s photo.
5. Blend edges smoothly — no floating clothes or cutout look.
6. Align accessories (cap, sunglasses) precisely with the head orientation.
7. Add **depth and realism** with soft shadows, reflections, and slight color tone matching.
8. Keep the overall image **photo-realistic and professional** — no cartoon or 3D look.
9. Match the model’s original background naturally.
10. Final image should look like a **real photo of the model wearing the outfit**, suitable for e-commerce or fashion marketing use.
${customPrompt ? `Additional Instructions: ${customPrompt}` : ""}
Output:
Return one **high-resolution, photo-realistic full-body image** of the model 
naturally wearing all provided assets, with seamless blending and correct proportions.`;
};
module.exports = {
  posterDesignPromptTemplate,
  posterCaptionPromptTemplate,
  IntelligentPosterDesignPromptTemplate,
  captionGeneratorPromptTemplate,
  blogHeadingPromptTemplate,
  blogGeneratorPromptTemplate,
  keywordHashtagGeneratorPromptTemplate,
  productDescriptionPromptTemplate,
  trendAnalyzerPromptTemplate,
  scriptWriterPromptTemplate,
  thumbnailGeneratorPromptTemplate,
  vertualTryOnPromptTemplate,
};
