import api from '../utils/api'

const setToken = (token) => {
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}

const get = async (auth) => {
  setToken(auth.token)
  const params = {
    organisation: auth.organisation
  }
  const response = await api.get('/devices', {params})
  return response.data
}

const create = async (auth, data) => {
  const token = auth.token
  setToken(token)
  const response = await api.post('/devices', data);

  return response.data
}

const remove = async (auth, device_id) => {
  setToken(auth.token)
  await api.delete(`/devices/${device_id}`)
}

export default {get, create, remove}