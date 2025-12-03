import { handleApiRoute } from "@/lib/api-utils";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await handleApiRoute("/trends", {
    method: "GET",
  });

  if (response instanceof NextResponse) {
    response.headers.set("Cache-Control", "public, max-age=300, s-maxage=300");
  }

  return response;
}