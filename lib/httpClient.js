import { API_BASE_URL } from "./api";

export async function apiRequest(path, options = {}) {
    const { timeout, ...fetchOptions } = options;
    const signal = timeout ? AbortSignal.timeout(timeout) : undefined;

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...fetchOptions,
        signal,
        headers: {
            ...(fetchOptions.headers || {}),
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(errorData.message || `Request failed${response.status}`);
        error.status = response.status;
        throw error;
    }

    try{
        return await response.json();
    } catch {
        return null;
    }
}