import { handleApiRoute } from "@/lib/api-utils";

export async function POST(request) {
  const body = await request.json();
  const {
    videoTopic,
    videoLength,
    targetAudience,
    videoGoal,
    tone,
    outputLanguage,
  } = body;

  return handleApiRoute("/generatescript", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      videoTopic,
      videoLength,
      targetAudience,
      videoGoal,
      tone,
      outputLanguage,
    }),
  });
}
