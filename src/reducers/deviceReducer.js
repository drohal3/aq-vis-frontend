import { createSlice } from '@reduxjs/toolkit'

const initialState = []

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