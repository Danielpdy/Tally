import { apiRequest } from "@lib/httpClient";

export const GetWeeklySummary = () => {
    return apiRequest("aggregatesweekly-summary", { method: "GET" });
}