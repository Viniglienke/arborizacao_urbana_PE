import axios from "axios";

export const api = axios.create({
  baseURL: "https://arborizacao-urbana-pe.vercel.app",
});