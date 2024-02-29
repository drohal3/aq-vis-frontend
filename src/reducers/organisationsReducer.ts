import { createSlice } from '@reduxjs/toolkit'
import {AppDispatch} from "../utils/store.ts";

const initialState = false

const organisationSlice = createSlice({
  name: 'organisation',
  initialState,
  reducers: {
    set: (state, action) => {
      return action.payload
    },
    reset: () => {
      return initialState
    }
  }
})

export const { set, reset } = organisationSlice.actions;

export const setOrganisation = (organisation) => {
  return (dispatch:AppDispatch) => {
    dispatch(set(organisation))
  }
}

export default organisationSlice.reducer