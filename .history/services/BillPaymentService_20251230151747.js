import { apiRequest } from "@lib/httpClient"
import { headers } from "@node_modules/next/headers"


export const MarkBillAsPaid = (recurringBillId, paidDate, accessToken) => {
    return apiRequest("/billpayment", {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        method: "POST"
    })
}


export const UnmarkBillAsPaid = (recurringBillId, paidDate, accessToken) => {
    return apiRequest("/billpayment", {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        method: "DELETE"
    })
}