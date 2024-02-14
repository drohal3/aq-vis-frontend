import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  devices_to_plot: []
}

// const exampleState = [
//     {device: "device_id", values: ["option2", "option3"]}
// ]

const measurementFormSlice = createSlice({
  name: 'measurementForm',
  initialState,
  reducers: {
    addDevice: (state, action) => {
      console.log("payload", action.payload)
      const device_id = action.payload.device_id
      const values = action.payload.values
      const new_devices_to_plot = [ ...state.devices_to_plot, {device_id, values}]
      const newState = {...state, devices_to_plot: new_devices_to_plot}
      console.log("new state", newState)
      return newState
    },
    setDeviceValues: (state, action) => {
      const device_id = action.payload.device_id
      const values = action.payload.values
      const new_devices_to_plot =  state.devices_to_plot.map((device) => {
        if (device.device_id === device_id) {
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

export const addMeasurementDevice = (device_id, values = []) => {
  console.log("dispatching add device", device_id)
  return (dispatch) => {
    return dispatch(addDevice({device_id, values}));
  }
}

export const setMeasurementValues = (device_id, values) => {
  return (dispatch) => {
    dispatch(setDeviceValues({device_id, values}));
  }
}


export default measurementFormSlice.reducer
