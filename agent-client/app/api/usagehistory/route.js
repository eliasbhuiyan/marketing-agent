import { handleApiRoute } from "@/lib/api-utils";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const type = searchParams.get("type") || "";
  return handleApiRoute(`/usagehistory?page=${page}&limit=${limit}&type=${type}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}