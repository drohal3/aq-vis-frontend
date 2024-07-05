import api from '../utils/api'
import {AxiosError} from "axios";

export type Credentials = {
  username: string;
  password: string;
}

export class LoginError extends Error {
  constructor(message:string) {
    super(message);
    this.name = "AuthError";
  }
}

export class TokenError extends Error {
  constructor(message:string) {
    super(message);
    this.name = "AuthError";
  }
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
  try {
    const response = await api.post('/token', formData,{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status == 401) {
        throw new LoginError("Invalid credentials!")
      }
      throw new LoginError("Something went wrong!")
    }

    throw new LoginError("Unexpected error!")
  }
};

const currentUser = async (token:string) => {
  try {
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
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status == 401) {
        throw new TokenError("Invalid token!")
      }
      throw new TokenError("Something went wrong!")
    }

    throw new TokenError("Unexpected error!")
  }
}

export default { login, currentUser };