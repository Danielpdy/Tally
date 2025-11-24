import { apiRequest } from "@lib/httpClient";

export const GetWeeklySummary = () => {
    return apiRequest("aggregates/weekly-summary", { method: "GET" });
}