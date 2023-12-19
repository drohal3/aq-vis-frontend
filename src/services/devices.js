import api from '../utils/api'

const devices = async (auth) => {
  const token = auth.token

  const response = await api.get('/measurements/devices', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data
}

export default {devices}