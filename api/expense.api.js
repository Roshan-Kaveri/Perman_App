import api from "./axiosInstance";

export const getExpenses = (userId) =>
  api.get(`/getTransaction?userId=${userId}`);

export const addExpense = (data) => api.post("/addExpense", data);
