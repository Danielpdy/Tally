import { API_BASE_URL } from "./api";

function getBaseUrl() {
    if (typeof window === "undefined") {
        return process.env.INTERNAL_API_URL || API_BASE_URL;
    }
    return API_BASE_URL;
}

export async function apiRequest(path, options = {}) {
    const { timeout, ...fetchOptions } = options;
    const signal = timeout ? AbortSignal.timeout(timeout) : undefined;

    const response = await fetch(`${getBaseUrl()}${path}`, {
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