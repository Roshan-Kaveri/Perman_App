import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.0.101:3001/api", // android emulator
});

// Finance Service (3001)
export const financeApi = axios.create({
  baseURL: "http://192.168.0.101:3001/api",
});

// AI Service (3002)
export const aiApi = axios.create({
  baseURL: "http://192.168.0.101:3002/",
});
