import { handleApiRoute } from "@/lib/api-utils";

export async function GET() {
    return await handleApiRoute("/allaffiliate", {
        method: "GET",
    });
}