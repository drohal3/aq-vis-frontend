import { createSlice } from '@reduxjs/toolkit'

const initialState = []

// const exampleState = [
//     {device: "device_id", options: ["option2", "option3"]}
// ]

const measurementFormSlice = createSlice({
  name: 'measurementForm',
  initialState,
  reducers: {
    addDevice: (state, action) => {
      const device_id = action.payload.device_id
      const options = action.payload.options
      return [ ...state, {device_id, options}]
    },
    setDeviceOptions: (state, action) => {
      const device_id = action.payload.device_id
      const options = action.payload.options
      return state.map((device) => {
        if (device.device_id === device_id) {
          return {...device, options}
        }
        return device
      })
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
  return (dispatch) => {
    return dispatch(addDevice(device_id, options))
  }
}

export const setMeasurementOptions = (device_id, options) => {
  return (dispatch) => {
    dispatch(setDeviceOptions(device_id, options))
  }
}


export default measurementFormSlice.reducer
