import { apiRequest } from "@lib/httpClient";

export const GetWeeklySummary = () => {
    REURNapiRequest("weekly-summary", { method: "GET" });
}