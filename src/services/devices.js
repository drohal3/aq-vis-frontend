import api from '../utils/api'

const devices = async (auth) => {
  console.log("device service")

  const token = auth.token

  const response = await api.get('/measurements/devices', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  console.log(response)
  return response.data
}

export default {devices}