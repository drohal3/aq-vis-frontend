import { createSlice } from '@reduxjs/toolkit'

const initialState = [ // TODO: load from DB
  // {code: "iaq1", name: "Ideal AQ 1", parameters: [{code: "conc", name: "concentration"}, {code: "pm10", name: "PM 10"}]},
  // {code: "iaq2", name: "Ideal AQ 2", parameters: [{code: "conc", name: "concentration"}]},
  // {code: "iaq3", name: "Ideal AQ 3", parameters: [{code: "conc", name: "concentration"}]},
]

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    set: (state, action) => {
      return action.payload
    },
    add: (state, action) => {
      return [...state, action.payload]
    },
    reset: () => { //logout
      return initialState
    }
  }
})

export const { set, add, reset } = devicesSlice.actions;

export const setDevices = (devices) => {
  return (dispatch) => {
    dispatch(set(devices))
  }
}

export const resetDevices = () => {
  return (dispatch) => {
    dispatch(reset())
  }
}

export const addDevice = (device) => {
  return (dispatch) => {
    dispatch(add(device))
  }
}

export default devicesSlice.reducer