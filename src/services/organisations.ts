import api from '../utils/api'

const baseUrl = "/organisations";

const get = async (auth, organisationId) => {
  const token = auth.token
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  const response = await api.get(`${baseUrl}/${organisationId}`, config)

  return response.data
}

export default {get}