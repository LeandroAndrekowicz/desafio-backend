import type { Axios } from "axios";
import axios from "axios";

interface WindowEnv {
  _env_?: {
    VITE_API_URL?: string;
  };
}

declare global {
  interface Window extends WindowEnv {}
}

const baseURL = window._env_?.VITE_API_URL || import.meta.env.VITE_API_URL

export const API: Axios = axios.create({
    baseURL: baseURL || "/api",
});