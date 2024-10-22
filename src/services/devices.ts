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
  const organisation_id = auth.currentUser?.organisation
  if (organisation_id == null) {
    return null
  }

  const response = await api.get(`/organisations/${organisation_id}/devices`)
  return response.data
}

const create = async (auth:AuthData, data:DeviceData) => {
  const token = auth.token
  setToken(token)
  const response = await api.post('/devices', data);

  return response.data
}

const update = async (auth:AuthData, data:DeviceData) => {
  const token = auth.token
  setToken(token)
  const response = await api.put(`/devices/${data.id}`, data);

  return response.data
}

const remove = async (auth:AuthData, device_id: string) => {
  setToken(auth.token)
  await api.delete(`/devices/${device_id}`)
}

export default {get, create, update, remove}
