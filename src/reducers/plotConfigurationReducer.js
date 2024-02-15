import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  devices_to_plot: []
}

// const exampleState = [
//     {device: "deviceId", values: ["option2", "option3"]}
// ]

const measurementFormSlice = createSlice({
  name: 'measurementForm',
  initialState,
  reducers: {
    addDevice: (state, action) => {
      console.log("payload", action.payload)
      const deviceId = action.payload.deviceId
      const values = action.payload.values
      const new_devices_to_plot = [ ...state.devices_to_plot, {deviceId, values}]
      const newState = {...state, devices_to_plot: new_devices_to_plot}
      console.log("new state", newState)
      return newState
    },
    setDeviceValues: (state, action) => {
      const deviceId = action.payload.deviceId
      const values = action.payload.values
      const new_devices_to_plot =  state.devices_to_plot.map((device) => {
        if (device.deviceId === deviceId) {
          return {...device, values}
        }
        return device
      })

      return {state, devices_to_plot: new_devices_to_plot}
    },
    reset: () => { //logout
      return initialState
    }
  }
})

export const { addDevice, setDeviceValues, reset } = measurementFormSlice.actions;

export const resetMeasurementForm = () => {
  return (dispatch) => {
    dispatch(reset())
  }
}

export const addMeasurementDevice = (deviceId, values = []) => {
  console.log("dispatching add device", deviceId)
  return (dispatch) => {
    return dispatch(addDevice({deviceId, values}));
  }
}

export const setMeasurementValues = (deviceId, values) => {
  return (dispatch) => {
    dispatch(setDeviceValues({deviceId, values}));
  }
}


export default measurementFormSlice.reducer
