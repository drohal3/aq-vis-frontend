import { createSlice } from '@reduxjs/toolkit'

const initialState = [ // TODO: load from DB
  {device_id: "iaq1", name: "Ideal AQ 1", values: [{code: "ppcm3", name: "#/cm3"}]},
  {device_id: "iaq2", name: "Ideal AQ 2", values: [{code: "ppcm3", name: "#/cm3"}]},
  {device_id: "iaq3", name: "Ideal AQ 3", values: [{code: "ppcm3", name: "#/cm3"}]},
]

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    set: (state, action) => {
      return action.payload
    },
    reset: () => { //logout
      return initialState
    }
  }
})

export const { set, reset } = devicesSlice.actions;

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

export default devicesSlice.reducer