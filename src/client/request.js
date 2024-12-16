import axios from "axios";

export const request = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const requestJson = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_JSON,
    headers: {
        "Content-Type": "application/json",
    },
});
