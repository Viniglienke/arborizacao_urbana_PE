import axios from "axios";

export const api = axios.create({
  baseURL: "https://arborizacao-urbana-inezl03v5-viniglienkes-projects.vercel.app",
});