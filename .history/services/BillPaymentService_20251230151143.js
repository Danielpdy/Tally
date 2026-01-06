import { apiRequest } from "@lib/httpClient"
import { headers } from "@node_modules/next/headers"


export const 


export const Unma = (recurringBillId, paidDate, accessToken) => {
    return apiRequest("/billpayment", {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        method: "DELETE"
    })
}