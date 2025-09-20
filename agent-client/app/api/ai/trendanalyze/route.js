import { handleApiRoute } from "@/lib/api-utils";

export async function GET() {

  const response = await handleApiRoute('/trends', {
    method: 'GET',
  });
  return response
}
