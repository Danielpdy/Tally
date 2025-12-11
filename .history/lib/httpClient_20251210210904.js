import { API_BASE_URL } from "./api";

export async function apiRequest(path, options = {}) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            ...(options.headers || {}),
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(errorData.message || `Request failed${response.status}`)
        throw new Error(`Request failed: ${response.status} ${message}`);
    }

    try{
        return await response.json();
    } catch {
        return null;
    }
}