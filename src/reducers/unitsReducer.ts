import { createSlice } from '@reduxjs/toolkit'
import {AppDispatch} from "../utils/store.ts";

export interface UnitData {
  id: string;
  name: string;
  symbol: string;
}

const initialState = Array<UnitData>()

const unitsSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
    set: (_state:Array<UnitData>, action) => {
      return action.payload
    },
    reset: () => { //logout
      return initialState
    }
  }
})

export const { set, reset } = unitsSlice.actions;

export const setUnits = (units:Array<UnitData>) => {
  return (dispatch:AppDispatch) => {
    dispatch(set(units))
  }
}

export const resetUnits = () => {
  return (dispatch:AppDispatch) => {
    dispatch(reset())
  }
}

export default unitsSlice.reducer