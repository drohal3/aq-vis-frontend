import { createSlice } from '@reduxjs/toolkit'
import {AppDispatch} from "../utils/store.ts";

const initialState = []


// const exampleState = [
//     {device: "code", values: ["option2", "option3"]}
// ]

const measurementFormSlice = createSlice({
  name: 'measurementForm',
  initialState,
  reducers: {
    addDevice: (state, action) => {
      console.log("payload", action.payload)
      const code = action.payload.code
      const parameters = action.payload.parameters
      const newDevicesToPlot = [ ...state, {code, parameters}]
      const newState = newDevicesToPlot
      console.log("new state", newState)
      return newState
    },
    removeDevice: (state, action) => {
      return state.filter(device => device.code !== action.payload.code)
    },
    setDeviceValues: (state, action) => {
      const code = action.payload.code
      const parameters = action.payload.parameters
      const new_devices_to_plot =  state.map((device) => {
        if (device.code === code) {
          return {...device, parameters}
        }
        return device
      })

      return new_devices_to_plot
    },
    reset: () => { //logout
      return initialState
    }
  }
})

export const { addDevice, removeDevice, setDeviceValues, reset } = measurementFormSlice.actions;

export const resetMeasurementForm = () => {
  return (dispatch:AppDispatch) => {
    dispatch(reset())
  }
}

export const addMeasurementDevice = (code, values = []) => {
  return (dispatch:AppDispatch) => {
    return dispatch(addDevice({code, values}));
  }
}

export const removeMeasurementDevice = (code) => {
  return (dispatch:AppDispatch) => {
    return dispatch(removeDevice({code}))
  }
}

export const setMeasurementValues = (code, values) => {
  return (dispatch:AppDispatch) => {
    dispatch(setDeviceValues({code, values}));
  }
}


export default measurementFormSlice.reducer
