import { handleApiRoute } from "@/lib/api-utils";

// Single Usage History
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const historyId = searchParams.get("id");
    if (!historyId) return res.status(400).json({ message: "History ID is required." });
    return handleApiRoute(`/usagehistory/single?id=${historyId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}
