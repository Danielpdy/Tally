import { apiRequest } from "@lib/httpClient";


export const getUsers = () => apiRequest("/users");
export const getUsersById = (id)