import { handleApiRoute } from "@/lib/api-utils";

export async function POST(request) {
  const body = await request.json();
  const { blogTopic, blogLength, writingStyle, seoKeywords, numberOfHeadings, outputLanguage } = body;
  
  return handleApiRoute("/bloggenerator", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      blogTopic,
      blogLength,
      writingStyle,
      seoKeywords,
      numberOfHeadings,
      outputLanguage,
    }),
  });
}
