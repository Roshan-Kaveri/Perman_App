import { financeApi as api } from "./axiosInstance";

export const getExpenses = (userId) =>
  api.get(`/getTransaction?userId=${userId}`);

export const addExpense = (data) => api.post("/addExpense", data);

export const deleteTransaction = async (transactionId) => {
  const res = await api.delete(`/deleteTransaction/${transactionId}`);
  return res.data;
};
