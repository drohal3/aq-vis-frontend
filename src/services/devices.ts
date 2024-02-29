import api from '../utils/api'
import {AuthData} from "../reducers/loggedUserReducer.ts";
import {DeviceData} from "../reducers/devicesReducer.ts";

const setToken = (token:string|null) => {
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}

const get = async (auth:AuthData) => {
  setToken(auth.token)
  const params = {
    organisation: auth.currentUser?.organisation
  }
  const response = await api.get('/devices', {params})
  return response.data
}

const create = async (auth:AuthData, data:DeviceData) => {
  const token = auth.token
  setToken(token)
  const response = await api.post('/devices', data);

  return response.data
}

const remove = async (auth:AuthData, device_id: string) => {
  setToken(auth.token)
  await api.delete(`/devices/${device_id}`)
}

export default {get, create, remove}
