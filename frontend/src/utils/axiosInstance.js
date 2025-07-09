import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     //Handle common errors globally
//     if (error.response) {
//       if (error.response.status === 401) {
//         //Redirect to login page
//         window.location.href = "/login";
//       } else if (error.response.status === 500) {
//         console.error("Server error pls try again later");
//       } else if (error.code === "ENCONNABORATED") {
//         console.error("Request timeout. pls try again.");
//       }
//       return Promise.reject(error);
//     }
//   }
// );

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Optional: emit a custom event or handle inside Login
        console.warn("Unauthorized. Handle inside component.");
      } else if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      } else if (error.code === "ENCONNABORATED") {
        console.error("Request timeout. Please try again.");
      }
    }
    return Promise.reject(error); // Must always return reject here
  }
);

export default axiosInstance;
