import { handleApiRoute } from "@/lib/api-utils";

export async function POST(request) {
  const body = await request.json();
  const { blogTopic, writingStyle, seoKeywords, numberOfHeadings, outputLanguage } = body;
  
  return handleApiRoute("/blogheadings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      blogTopic,
      writingStyle,
      seoKeywords,
      numberOfHeadings,
      outputLanguage,
    }),
  });
}
