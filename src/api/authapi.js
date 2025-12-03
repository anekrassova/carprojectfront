import api from "../axios";

const BASE = import.meta.env.VITE_API_URL;

export const registerUser = async (user) => {
  const res = await api.post(`${BASE}/auth/register`, user);
  return res.data;
};

export const loginUser = async (credentials) => {
  const res = await api.post(`${BASE}/auth/login`, credentials);
  return res.data;
};
