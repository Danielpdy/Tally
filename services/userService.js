
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
export const refreshAcessToken = (refreshToken) =>
    apiRequest("/users/refresh", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
        timeout: 5000,
    })
export const updateUser = (id, data) =>
    apiRequest(`/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    })
export const changePassword = (id, currentPassword, newPassword) =>
    apiRequest(`/users/${id}/password`, {
        method: "PUT",
        body: JSON.stringify({ currentPassword, newPassword }),
    })
export const deleteuser = (id) =>
    apiRequest(`/users/${id}`, { method: "DELETE"});
export const forgotPassword = (email) =>
    apiRequest("/users/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
    });
export const resetPassword = (token, newPassword) =>
    apiRequest("/users/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, newPassword }),
    });
export const oauthLogin = (email, name, provider) =>
    apiRequest("/users/oauth", {
        method: "POST",
        body: JSON.stringify({ email, name, provider }),
    });