import { apiRequest } from "@lib/httpClient";
import { headers } from "@node_modules/next/headers";

export const AddRecurringBill = (recurringBill, accessToken) => {
    return apiRequest("/recurringbill", {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        method: "POST",
        body: JSON.stringify(recurringBill)
    });
};

export const GetRecurringBills = (accessToken) => {
    return apiRequest("/recurringbill", {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        method: "GET"
    });
};

export const DeleteBillById = (billId, accessToken) => {
return apiRequest(`/recurringbill/${billId}`, {
    headers: {
        "Authorization": `Bearer ${accessToken}`
    },
    method: "DELETE"
});
};

export const GetBillsDueThisWeek = (accessToken) => {
    return apiRequest(`/recurringbill/dueThiseek`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        method: "GET"
    });
};