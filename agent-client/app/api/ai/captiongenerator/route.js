import { handleApiRoute } from "@/lib/api-utils";

export async function POST(request) {
  const body = await request.json();
  const { productDescription, targetAudience, tone, platform } = body;
  
  return handleApiRoute("/captiongenerator", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productDescription,
      targetAudience,
      tone,
      platform,
    }),
  });
}
