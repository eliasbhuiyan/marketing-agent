import { handleApiRoute } from "@/lib/api-utils";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await handleApiRoute("/team", {
    method: "GET",
  });

  if (response instanceof NextResponse) {
    response.headers.set("Cache-Control", "public, max-age=300, s-maxage=300");
  }

  return response;
}

export async function POST(request) {
  const body = await request.json();
  const { addTeamMemberEmail, brandId, memberId } = body;
  if (brandId && memberId) {
    return handleApiRoute("/removemember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ brandId, memberId }),
    });
  }
  return handleApiRoute("/inviteamember", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ addTeamMemberEmail }),
  });
}
