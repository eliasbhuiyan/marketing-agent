import { handleApiRoute } from "@/lib/api-utils";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await handleApiRoute("/brand", {
    method: "GET",
  });

  if (response instanceof NextResponse) {
    response.headers.set("Cache-Control", "public, max-age=300, s-maxage=300");
  }

  return response;
}
export async function POST(request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    return handleApiRoute("/brand", {
      method: "POST",
      body: formData,
    });
  }

  const body = await request.json();
  const { brandId, companyName, details, colors, assets, outputLanguage, existingAssets } = body;
  return handleApiRoute("/brand", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      brandId,
      companyName,
      details,
      colors,
      assets,
      outputLanguage,
      existingAssets,
    }),
  });
}
