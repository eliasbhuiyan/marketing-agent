import { handleApiRoute } from "@/lib/api-utils";
import { NextResponse } from "next/server";

// Single Usage History
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const historyId = searchParams.get("id");
  const result = await handleApiRoute(`/usagehistory/single?id=${historyId}`, {
    method: "GET",
  });

  // Add cache control headers
  if (result instanceof NextResponse) {
    result.headers.set('Cache-Control', 'private, max-age=300, stale-while-revalidate=60');
    result.headers.set('ETag', `"history-${Date.now()}"`);
  }

  return result;
}
