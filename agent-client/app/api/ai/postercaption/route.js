import { handleApiRoute } from "@/lib/api-utils";

export async function POST(request) {
  const body = await request.json();
  const { productDescription, tone, platform, keywords, language } = body;
  
  return handleApiRoute("/postercaption", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productDescription,
      tone,
      platform,
      keywords,
      language,
    }),
  });
}
