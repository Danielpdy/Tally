import { apiRequest } from "@lib/httpClient";

export const GetWeeklySummary = () => {
    return apiRequest("weekly-summary", { method: "GET" });
}