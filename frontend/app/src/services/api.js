import axios from "axios";

export const api = axios.create({
  baseURL: "https://arborizacao-urbana-5t3godv48-viniglienkes-projects.vercel.app",
});