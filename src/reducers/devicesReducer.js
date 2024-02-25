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
    remove: (state, action) => {
      const device_id = action.payload
      return state.filter((device) => device.id !== device_id)
    },
    add: (state, action) => {
      return [...state, action.payload]
    },
    reset: () => { //logout
      return initialState
    }
  }
})

export const { set, add, remove, reset } = devicesSlice.actions;

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

export const removeDevice = (device_id) => {
  return (dispatch) => {
    dispatch(remove(device_id))
  }
}

export default devicesSlice.reducer