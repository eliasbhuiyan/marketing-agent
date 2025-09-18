const posterDesignPromptTemplate = () => {
  return `
  You are a professional marketing designer. Create a high-quality, visually appealing product poster for social media marketing.
Requirements:
1. **Images**
    - Include the **product image** prominently.
   - Include the **model image** if provided.
   - Remove unnecessary background and make images blend naturally.
   
2. **Layout & Composition**
   - Follow a modern, clean, and professional layout.
   - Ensure the product is the main focus.
   - Model can complement the scene without overpowering the product.
   - Maintain proper alignment, spacing, and balance.
   
3. **Brand Customization**
   - Use the **brand primary, secondary, and accent colors** for text, highlights, or background elements.
   - Use **heading font** for main tagline, **body font** for additional text.
   - Maintain brand identity and tone throughout.

4. **Text / Caption**
   - Include the marketing **caption** provided by the user.
   - Ensure text is readable and contrasts well with background.
   - Optional: add catchy tagline or call-to-action in professional style.

5. **Background & Effects**
   - Use a clean, minimalistic background or gradient if needed.
   - Add subtle shadows or highlights to make product stand out.
   - Avoid clutter and keep it visually appealing.

6. **Format & Output**
   - Poster resolution suitable for social media (e.g., 1080x1080 for Instagram, 1200x628 for Facebook).
   - Output a **single high-quality image** ready for download.

7. **Mood / Tone**
   - Professional, modern, engaging, and visually appealing.
   - Emphasize the product as premium and desirable.

Provide the final **poster design as an image output** (if using an AI image generator), or return a detailed **design composition** specifying positions, colors, and text overlays if generating programmatically via Canvas/Sharp.

`;
};

const captionGeneratorPromptTemplate = ({ productDescription, targetAudience, tone, platform}) => {
   return `
   You are a professional social media copywriter. 
Write a creative, engaging, and persuasive caption for a post based on the following information:

Product/Service Description: ${productDescription}
Target Audience: ${targetAudience}
Tone: ${tone}
Platform: ${platform}

Requirements:
- The caption must suit the ${platform} style.
- Make it concise and attention-grabbing.
- Include a call-to-action if appropriate.
- Avoid using overly generic phrases; make it unique and relatable to the audience.

Output ONLY the caption text.
   `
}

const blogGeneratorPromptTemplate = ({ blogTopic, blogLength, writingStyle, seoKeywords, numberOfHeadings, outputLanguage, images}) => {
   return `You are an expert content writer and SEO specialist. 
Write a high-quality, human-like blog based on the following details:
Blog Topic: ${blogTopic}
Blog Length: ${blogLength} words
Number of Headings: ${numberOfHeadings}
Writing Style: ${writingStyle}
Output Language: ${outputLanguage}
SEO Focus Keywords: ${seoKeywords} (use naturally throughout the content)
Images: ${JSON.stringify(images)} (use these images in the blog)
Requirements:
- Output ONLY valid HTML fragment (no surrounding <html> or <body> tags). Do not include any other text. 
- Use only these HTML tags: <h1>, <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <a>, <img>, <blockquote>, <figure>, <figcaption>. Do not use <style>, <script>, or inline JavaScript.
- Start with a top-level title using <h1> containing the Blog Topic.
- Include an introduction section (one or two <p> elements).
- Include exactly ${numberOfHeadings} content sections. Each section should have a heading (<h2>) and 1–3 <p> paragraphs. Each paragraph should be short: roughly 3–4 lines of readable text (approx. 2–5 sentences).
-  After **each heading**, insert a relevant image provided using '<img>' tag.
- Integrate SEO keywords naturally and sparingly throughout the content; avoid keyword stuffing.
- After the conclusion, add a heading for the FAQ section exactly as: <h2>FAQ in (blog topic here)</h2>.
- Under the FAQ heading include at least 4 Q&A entries relevant and trendy to the topic. Format each Q&A as:
   <h3>Question text?</h3>
   <p>Answer text.</p>
- Each FAQ answer should be concise (1–3 short paragraphs). Provide practical or up-to-date context where appropriate.
- Do NOT include any decorative dashes, lines like "---", or markdown. Do not output any meta commentary or other text outside the HTML fragment.
- Ensure links (<a>) include meaningful anchor text and absolute URLs (placeholders are fine).
- Output must be well-formed HTML that can be inserted directly into a rich-text editor.

Output only the complete blog content.`
}

const keywordHashtagGeneratorPromptTemplate = ({ industry, platform, numKeywords }) => {
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
}

const productDescriptionPromptTemplate = ({ productName, keyFeatures, descriptionLength, includeKeywords, outputLanguage }) => {
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
}

module.exports = { posterDesignPromptTemplate, captionGeneratorPromptTemplate, blogGeneratorPromptTemplate, keywordHashtagGeneratorPromptTemplate, productDescriptionPromptTemplate };
