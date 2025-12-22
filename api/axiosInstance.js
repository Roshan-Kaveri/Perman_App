import axios from "axios";

export default axios.create({
  baseURL: "https://finservice.perman.hmmbo.com/api", // android emulator
});

// Finance Service (3001)
export const financeApi = axios.create({
  baseURL: "https://finservice.perman.hmmbo.com/api",
});

// AI Service (3002)
export const aiApi = axios.create({
  baseURL: "https://aiservice.perman.hmmbo.com/",
});
