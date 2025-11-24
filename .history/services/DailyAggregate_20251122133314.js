import { apiRequest} from '@lib/httpClient';

export const addDailyAggregate = (transaction) => {
    apiRequest("DailyAggregate", {
        method: "POST",
        body: JSON.stringify(transaction)
    });
}

export const getDaily