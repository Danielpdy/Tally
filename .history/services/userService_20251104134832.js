
import { apiRequest } from "@lib/httpClient";


export const getUsers = () => apiRequest("/users");
export const getUsersById = (id) => apiRequest(`/users${id}`);

export const createUser = (user) => 
    apiRequest("/users/signup",{
        method: "POST",
        body: JSON.stringify(user),
    });
export const createSession = (session) =>
    apiRequest("/users/login", {
        method: "POST",
        body: JSON.stringify(session),
    });
export const updateUser = (id, user) =>
    apiRequest(`/users${id}`, {
        method: "PUT",
        body: JSON.stringify(user),
    })
export const deleteuser = (id) =>
    apiRequest(`/users/${id}`, { method: "DELETE"});