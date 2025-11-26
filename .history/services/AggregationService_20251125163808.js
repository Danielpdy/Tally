import { apiRequest } from "@lib/httpClient";
import { headers } from "@node_modules/next/headers";

export const GetWeeklySummary = (accessToken) => {
    return apiRequest(ggregates/weekly-summary", {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        method: "GET" 
    });
}