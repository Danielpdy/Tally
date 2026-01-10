import { apiRequest } from "@lib/httpClient";
import { headers } from "@node_modules/next/headers";

export const Addtransaction = (transaction, accessToken) => {

    return apiRequest("/transactions", {
        headers : {
            "Authorization": `Bearer ${accessToken}`
        },
        method: "POST",
        body: JSON.stringify(transaction)
    })
}

export const GetTransactions = (accessToken) => apiRequest("/transactions", {
    headers: {
        "Authorization": `Bearer ${accessToken}`
    }
});

export const DeleteTransaction = (id, accessToken) => {
    return apiRequest(`/transactions/${id}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        method: "DELETE"
    })
}