import { handleApiRoute } from "@/lib/api-utils";

export async function POST(request) {
    const body = await request.json();
    const { brandId, postId, credits, status } = body;
    return await handleApiRoute("/affiliate/status", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            brandId,
            postId,
            credits,
            status,
        }),
    });
}