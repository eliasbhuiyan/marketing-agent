import { handleApiRoute } from "@/lib/api-utils";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await handleApiRoute("/brand", {
    method: "GET",
    // Set cache tag so we can revalidate it via revalidateTag('brand-data')
    next: { tags: ["brand-data"] },
  });

  if (response instanceof NextResponse) {
    response.headers.set("Cache-Control", "public, max-age=300, s-maxage=300");
  }

  return response;
}
export async function POST(request) {
  const body = await request.json();
  const { brandId, companyName, details, colors, fonts, assets } = body;

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
      fonts,
      assets,
    }),
  });
}
