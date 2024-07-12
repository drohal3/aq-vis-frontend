import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // replace with your API base URL
  // accept: 'application/json',
  timeout: 1000,
});

export default api