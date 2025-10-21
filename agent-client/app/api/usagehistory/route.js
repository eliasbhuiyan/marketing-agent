import { handleApiRoute } from "@/lib/api-utils";

export async function GET() {
  return handleApiRoute("/usagehistory", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
