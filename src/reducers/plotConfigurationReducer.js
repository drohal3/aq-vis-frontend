import { createSlice } from '@reduxjs/toolkit'

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
      const values = action.payload.values
      const newDevicesToPlot = [ ...state, {code, values}]
      const newState = newDevicesToPlot
      console.log("new state", newState)
      return newState
    },
    removeDevice: (state, action) => {
      return state.filter(device => device.code !== action.payload.code)
    },
    setDeviceValues: (state, action) => {
      const code = action.payload.code
      const values = action.payload.values
      const new_devices_to_plot =  state.map((device) => {
        if (device.code === code) {
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

export const addMeasurementDevice = (code, values = []) => {
  return (dispatch) => {
    return dispatch(addDevice({code, values}));
  }
}

export const removeMeasurementDevice = (code) => {
  return (dispatch) => {
    return dispatch(removeDevice({code}))
  }
}

export const setMeasurementValues = (code, values) => {
  return (dispatch) => {
    dispatch(setDeviceValues({code, values}));
  }
}


export default measurementFormSlice.reducer
