import { API_URL } from "@env";

export const fetcher = async (url: string, method: string, data?: {}) => {
    const response = await fetch(API_URL + url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const responseData = response.json();
    return responseData;
}