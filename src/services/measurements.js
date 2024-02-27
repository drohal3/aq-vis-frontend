import axios from "axios";
import api from '../utils/api'
import {useAuthData} from "../hooks/useAuthHook";

const baseUrl = "/measurements";

const setToken = (token) => {
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}

const get = async (deviceId, token = null) => {
  setToken(token)

  const params = {
    date_time_from: "2024-02-09 17:12:21",
    date_time_to: "2024-02-09 17:12:23",
    device_id: deviceId,
  }

  const response = await api.get("/measurements", {params})

  console.log(response.data)
}

export default  {get}