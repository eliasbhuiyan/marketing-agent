import { handleApiRoute } from "@/lib/api-utils";

export async function GET() {
  return handleApiRoute("/library", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
