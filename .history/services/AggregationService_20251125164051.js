import { apiRequest } from "@lib/httpClient";
import { headers } from "@node_modules/next/headers";

export const GetWeeklySummary = (accessToken) => {
    return apiRequest("/aggregates/weekly-summary", {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        method: "GET" 
    });
}