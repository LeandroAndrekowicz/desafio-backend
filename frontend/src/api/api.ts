import type { Axios } from "axios";
import axios from "axios";

export const API: Axios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});