import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  devices_to_plot: []
}

// const exampleState = [
//     {device: "device_id", options: ["option2", "option3"]}
// ]

const measurementFormSlice = createSlice({
  name: 'measurementForm',
  initialState,
  reducers: {
    addDevice: (state, action) => {
      console.log("payload", action.payload)
      const device_id = action.payload.device_id
      const options = action.payload.options
      const new_devices_to_plot = [ ...state.devices_to_plot, {device_id, options}]
      const newState = {...state, devices_to_plot: new_devices_to_plot}
      console.log("new state", newState)
      return newState
    },
    setDeviceOptions: (state, action) => {
      const device_id = action.payload.device_id
      const options = action.payload.options
      const new_devices_to_plot =  state.devices_to_plot.map((device) => {
        if (device.device_id === device_id) {
          return {...device, options}
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

export const { addDevice, setDeviceOptions, reset } = measurementFormSlice.actions;

export const resetMeasurementForm = () => {
  return (dispatch) => {
    dispatch(reset())
  }
}

export const addMeasurementDevice = (device_id, options = []) => {
  console.log("dispatching add device", device_id)
  return (dispatch) => {
    return dispatch(addDevice({device_id, options}));
  }
}

export const setMeasurementOptions = (device_id, options) => {
  return (dispatch) => {
    dispatch(setDeviceOptions({device_id, options}));
  }
}


export default measurementFormSlice.reducer
