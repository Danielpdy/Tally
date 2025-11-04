import { apiRequest } from "@lib/httpClient";
import { use } from "react";


export const getUsers = () => apiRequest("/users");
export const getUsersById = (id) => apiRequest(`/users${id}`);
export const createUser = (user) =>