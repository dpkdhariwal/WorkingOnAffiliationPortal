import axios from "axios";

const api_axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ works with Vite
  withCredentials: true,
});

export default api_axios;