import api from '../utils/api'
import {AuthData} from "../reducers/loggedUserReducer.ts";

// const baseUrl = "/measurements";

const setToken = (token:string|null) => {
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}

const get = async (deviceId:string, parameters:string[], dateTimeFrom:string, dateTimeTo:string, auth:AuthData) => {
  setToken(auth.token)

  const parametersToPlot = parameters.join(",")

  const params = {
    date_time_from: dateTimeFrom,
    date_time_to: dateTimeTo,
    device_id: deviceId,
    parameters: parametersToPlot
  }

  const timeout = 5000

  const response = await api.get("/measurements", {params, timeout})
  return response.data
}

export default  {get}