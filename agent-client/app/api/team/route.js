import { handleApiRoute } from "@/lib/api-utils";
import { NextResponse } from "next/server";
export const revalidate = 600;

export async function GET() {
  return handleApiRoute("/team", {
    method: "GET",
    next: { revalidate: 600 },
  });
}

export async function POST(request) {
  const body = await request.json();
  const { addTeamMemberEmail } = body;

  const res = await handleApiRoute("/inviteamember", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ addTeamMemberEmail }),
  });
  return res;
}
