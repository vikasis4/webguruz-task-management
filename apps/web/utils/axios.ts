import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  if (API_KEY) {
    config.headers["x-api-key"] = API_KEY;
  }
  return config;
});

export default axiosClient;
