import axios from "axios";
const api = axios.create({
  baseURL: 'http://127.0.0.1:8080', // replace with your API base URL
});


const login = async (credentials) => {
  // credentials: email, password
  console.log("login service")
  const formData = new URLSearchParams();
  formData.append('grant_type', '');
  formData.append('username', credentials.username);
  formData.append('password', credentials.password);
  formData.append('scope', '');
  formData.append('client_id', '');
  formData.append('client_secret', '');
  const response = await api.post('/token', formData,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return response.data;
};

const currentUser = async (token) => {
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  const response = await api.get('/users/me',{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data
}

export default { login, currentUser };