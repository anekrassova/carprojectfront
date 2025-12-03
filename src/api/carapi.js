import api from "../axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/cars";

export const getCars = async () => {
  const res = await api.get(API_URL);
  return res.data;
};

export const deleteCar = async (id) => {
  await apu.delete(`${API_URL}/${id}`);
};

export const addCar = async (car) => {
  const res = await api.post(API_URL, car, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const updateCar = async ({ car, url }) => {
  const res = await api.put(url, car, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};
