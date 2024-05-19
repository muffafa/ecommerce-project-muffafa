// src/hooks/useCustomAxios.js
import axios from "axios";

const useCustomAxios = () => {
  const instance = axios.create({
    baseURL: "http://localhost:3000/api",
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized errors
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login"; // Redirect to login page
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useCustomAxios;
