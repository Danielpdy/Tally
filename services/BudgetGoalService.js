import { apiRequest } from "@lib/httpClient";
import { headers } from "@node_modules/next/headers";

export const GetBudgetGoals = (accessToken) => {
    return apiRequest("/budgetgoals",{
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        method: "GET"
    });
};

export const AddBudgetGoal = (budgetGoal, accessToken) => {
    return apiRequest("/budgetgoals", {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        method: "POST",
        body: JSON.stringify(budgetGoal)
    });
};

export const UpdateBudgetGoal = (updatedBudgetGoal, accessToken) => {
    return apiRequest("/budgetgoals", {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        method: "PATCH",
        body: JSON.stringify(updatedBudgetGoal)
    })
};

export const DeleteBudgetGoal = (accessToken) => {
    return apiRequest("/budgetgoals", {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        method: "DELETE"
    });
};