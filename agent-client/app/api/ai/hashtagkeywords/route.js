import { handleApiRoute } from "@/lib/api-utils";

export async function POST(request) {
  const body = await request.json();
  const { industry, numKeywords, platform } = body;
  
  return handleApiRoute("/keywordhashtaggenerator", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      industry,
      numKeywords,
      platform,
    }),
  });
}
