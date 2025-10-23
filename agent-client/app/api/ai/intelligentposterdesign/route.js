import { handleApiRoute } from "@/lib/api-utils";

export async function POST(request) {
  const formData = await request.formData();
  return handleApiRoute("/intelligentposterdesign", {
    method: "POST",
    body: formData,
  });
}
