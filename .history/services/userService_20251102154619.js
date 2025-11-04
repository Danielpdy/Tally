import { apiRequest } from "@lib/httpClient";



export const getUsers = () => apiRequest("/users");
export const getUsersById = (id) => apiRequest(`/users${id}`);
export const createUser = (user) => 
    apiRequest()