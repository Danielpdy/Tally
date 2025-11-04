import { apiRequest } from "@lib/httpClient";



export const getUsers = () => apiRequest("/users");
export const getUsersById = (id) => apiRequest(`/users${id}`);
export const createUser = (user) => 
    apiRequest("/users",{
        method: "POST",
        body: JSON.stringify(user),
    });
export const updateUser = (id, user) =>
    apiRequest(`/users/${id}`{
        method: "PUT",
        body: JSON.stringify(user),
    })
    