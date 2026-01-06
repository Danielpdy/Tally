import { apiRequest } from "@lib/httpClient"
import { headers } from "@node_modules/next/headers"

export const GetPaidBills = (accessToken) => {
    return apiRequest("/billpayment", {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        method: "GET"
    });
};

export const MarkBillAsPaid = (newBillPayment, accessToken) => {
    return apiRequest("/billpayment", {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        method: "POST",
        body: JSON.stringify(newBillPayment)
        
    });
};

export const UnmarkBillAsPaid = (recurringBillId, accessToken) => {
    return apiRequest(`/billpayment/${recurringBillId}?paidDate=${paidDate}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        method: "DELETE"
    });
};