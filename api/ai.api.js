import { aiApi } from "./axiosInstance.js";

export const getMonthlySummary = (userId, year, month) => {
  return aiApi.get("/summary/month", {
    params: { userId, year, month },
  });
};

// -------------------------------
// YEARLY SUMMARY
// -------------------------------
export const getYearlySummary = (userId, year) => {
  return aiApi.get("/summary/year", {
    params: { userId, year },
  });
};

// -------------------------------
// UPDATE / POST REQUEST
// -------------------------------
export const updateAiData = (data) => {
  return aiApi.post("/update", data);
};
