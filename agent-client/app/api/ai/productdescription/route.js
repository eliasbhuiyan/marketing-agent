import { handleApiRoute } from "@/lib/api-utils";

export async function POST(request) {
  const body = await request.json();
  const { productName, keyFeatures, descriptionLength, includeKeywords, outputLanguage } = body;
  
  return handleApiRoute("/productdescription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productName,
      keyFeatures,
      descriptionLength,
      includeKeywords,
      outputLanguage,
    }),
  });
}
