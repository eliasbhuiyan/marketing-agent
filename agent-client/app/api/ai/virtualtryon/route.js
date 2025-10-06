import { handleApiRoute } from "@/lib/api-utils";

export async function POST(request) {
  const formData = await request.formData();
  return handleApiRoute("/virtualtryon", {
    method: "POST",
    body: formData,
  });
}
