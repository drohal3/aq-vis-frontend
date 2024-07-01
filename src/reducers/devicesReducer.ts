import { createSlice } from '@reduxjs/toolkit'
import {AppDispatch} from "../utils/store.ts";

export interface DeviceParameterData{
  unit: string,
  name: string,
  code: string
}

export interface DeviceData {
  id?: string,
  code: string,
  name: string,
  organisation: string;
  parameters: Array<DeviceParameterData>
}

const initialState = Array<DeviceData>()

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    set: (_state, action) => {
      return action.payload
    },
    remove: (state, action) => {
      const device_id = action.payload
      return state.filter((device) => device.id !== device_id)
    },
    add: (state, action) => {
      return [...state, action.payload]
    },
    reset: ():Array<DeviceData> => { //logout
      return initialState
    }
  }
})

export const { set, add, remove, reset } = devicesSlice.actions;

export const setDevices = (devices:[DeviceData]) => {
  return (dispatch:AppDispatch) => {
    dispatch(set(devices))
  }
}

export const resetDevices = () => {
  return (dispatch: AppDispatch) => {
    dispatch(reset())
  }
}

export const addDevice = (device:DeviceData) => {
  return (dispatch: AppDispatch) => {
    dispatch(add(device))
  }
}

export const removeDevice = (deviceId:string) => {
  return (dispatch: AppDispatch) => {
    dispatch(remove(deviceId))
  }
}

export default devicesSlice.reducer