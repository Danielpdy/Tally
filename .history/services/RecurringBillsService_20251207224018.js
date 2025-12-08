import { apiRequest } from "@lib/httpClient";
import { headers } from "@node_modules/next/headers";

export const AddRecurringBill(recurringBill, accessToken) => {
    return apiRequest("/recurringbill", {
        headers: {
            
        }
    })
}