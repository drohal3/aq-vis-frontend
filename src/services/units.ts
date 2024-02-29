import api from '../utils/api'

const get = async () => {
  const response = await api.get('/units')
  return response.data
}

export default {get}