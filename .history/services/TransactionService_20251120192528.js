import Transactions from "@app/components/transactions/Transactions";
import { apiRequest } from "@lib/httpClient";

export const Addtransaction = (transaction) => {
    return apiRequest("/transactions", {
        method: "POST",
        body: JSON.stringify(transaction)
    })
}

export const GetTransactions = (transactions) => {
    return apiRequest("/transactions")
}