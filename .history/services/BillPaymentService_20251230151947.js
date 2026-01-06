import { apiRequest } from "@lib/httpClient"
import { headers } from "@node_modules/next/headers"


export const MarkBillAsPaid = ( accessToken) => {
    return apiRequest("/billpayment", {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        method: "POST",
        body: JSON.stringify()
        
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