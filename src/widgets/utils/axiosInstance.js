import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: import.meta.env[`VITE_${import.meta.env.MODE.toUpperCase()}_URL`],
});