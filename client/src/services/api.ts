import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";

// 1. Ensure Vite env variables start with VITE_
const API_URL = import.meta.env.VITE_BACKEND_DEV_URL || "/api";

const api: AxiosInstance = axios.create({
  baseURL: API_URL, // FIXED: Capitalized URL
  timeout: 10000,   // Bumped to 10s (1s timeout is often too short for backend cold-starts)
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});
console.log(import.meta.env.VITE_BACKEND_DEV_URL);
console.log(API_URL);

// 2. Request Interceptor (Perfect for adding Bearer Tokens later)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Example: Grab a token from localStorage if you use auth
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response Interceptor (Global Error / Response Handling)
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Clean return: just the data payload from your server response
    return response.data;
  },
  (error) => {
    // Standardizing backend error messaging
    const message = error.response?.data?.message || "Something went wrong";
    
    console.error(`[API Error]: ${message}`, error.response);

    // Global intercept rules (e.g., redirecting on 401 Unauthorized)
    if (error.response?.status === 401) {
      // localStorage.removeItem("token");
      // window.location.href = "/login";
    }

    return Promise.reject(new Error(message));
  }
);

export default api;