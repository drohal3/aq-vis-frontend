import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const unitsSlice = createSlice({
  name: "units",
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

export const { set, reset } = unitsSlice.actions;

export const setUnits = (units) => {
  return (dispatch) => {
    dispatch(set(units))
  }
}

export const resetUnits = () => {
  return (dispatch) => {
    dispatch(reset())
  }
}

export default unitsSlice.reducer