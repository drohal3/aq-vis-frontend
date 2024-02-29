import api from '../utils/api'
import {AuthData} from "../reducers/loggedUserReducer.ts";

const baseUrl = "/organisations";

const get = async (auth:AuthData, organisationId:string) => {
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