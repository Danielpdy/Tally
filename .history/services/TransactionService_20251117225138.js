import { apiRequest } from "@lib/httpClient";

export const Addtransaction = (transaction) => {
    apiRequest("/transactions"), {
        method: "POST",
        body: JSON.stringify
    }
}