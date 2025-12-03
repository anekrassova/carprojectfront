import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  console.log("AXIOS REQUEST:", config.method, config.url);
  console.log("BODY:", config.data);

  const token = localStorage.getItem("token");
  console.log("TOKEN SENT FROM AXIOS:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
