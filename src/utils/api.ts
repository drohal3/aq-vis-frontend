import axios from "axios";

console.log("backend url", import.meta.env.VITE_BACKEND_URL)

const api = axios.create({
  baseURL: 'http://127.0.0.1:8080', // replace with your API base URL
  // accept: 'application/json',
  timeout: 1000,
});

export default api