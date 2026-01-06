import { apiRequest } from "@lib/httpClient"
import { headers } from "@node_modules/next/headers"

export const DeleteBillPayment = (recurringBillId, paidDate) => {
    return apiRequest("/billpayment", {
        headers: {
            "Authorization": 
        }
    })
}