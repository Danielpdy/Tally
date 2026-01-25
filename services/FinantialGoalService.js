import { apiRequest } from "@lib/httpClient";
import { headers } from "@node_modules/next/headers";

export const GetFinancialGoals = (accessToken) => {
  return apiRequest("/finantialgoals", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: "GET",
  });
};

export const AddFinancialGoal = (financialGoal, accessToken) => {
  return apiRequest("/finantialgoals", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify(financialGoal),
  });
};

export const UpdateFinancialGoal = (id, financialGoal, accessToken) => {
  return apiRequest(`/finantialgoals/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: "PUT",
    body: JSON.stringify(financialGoal),
  });
};

export const DeleteFinantialGoal = (id, accessToken) => {
  return apiRequest(`/finantialgoals/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: "DELETE",
  });
};
