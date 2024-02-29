import api from '../utils/api'

export type Credentials = {
  username: string;
  password: string;
}

const login = async (credentials:Credentials) => {
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

const currentUser = async (token:string) => {
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