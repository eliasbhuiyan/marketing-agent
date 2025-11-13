import { handleApiRoute } from "@/lib/api-utils";

export async function GET() {
    return await handleApiRoute("/affiliate", {
        method: "GET",
    });
}

export async function POST(request) {
    const body = await request.json();
    const { postLink } = body;
    return await handleApiRoute("/affiliate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            postLink,
        }),
    });
}