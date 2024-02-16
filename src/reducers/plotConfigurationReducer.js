import { createSlice } from '@reduxjs/toolkit'

const initialState = []


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
      const newDevicesToPlot = [ ...state, {deviceId, values}]
      const newState = newDevicesToPlot
      console.log("new state", newState)
      return newState
    },
    removeDevice: (state, action) => {
      return state.filter(device => device.deviceId !== action.payload.deviceId)
    },
    setDeviceValues: (state, action) => {
      const deviceId = action.payload.deviceId
      const values = action.payload.values
      const new_devices_to_plot =  state.map((device) => {
        if (device.deviceId === deviceId) {
          return {...device, values}
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
  return (dispatch) => {
    dispatch(reset())
  }
}

export const addMeasurementDevice = (deviceId, values = []) => {
  return (dispatch) => {
    return dispatch(addDevice({deviceId, values}));
  }
}

export const removeMeasurementDevice = (deviceId) => {
  return (dispatch) => {
    return dispatch(removeDevice({deviceId}))
  }
}

export const setMeasurementValues = (deviceId, values) => {
  return (dispatch) => {
    dispatch(setDeviceValues({deviceId, values}));
  }
}


export default measurementFormSlice.reducer
