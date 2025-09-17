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

module.exports = { posterDesignPromptTemplate, captionGeneratorPromptTemplate };
