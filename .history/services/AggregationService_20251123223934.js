import { apiRequest } from "@lib/httpClient";

export const GetWeeklySummary = () => {
    returnapiRequest("weekly-summary", { method: "GET" });
}