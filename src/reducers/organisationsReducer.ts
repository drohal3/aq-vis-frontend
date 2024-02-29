import { createSlice } from '@reduxjs/toolkit'
import {AppDispatch} from "../utils/store.ts";

const initialState = false

export interface OrganisationData {
  id: string;
  name: string;
}

const organisationSlice = createSlice({
  name: 'organisation',
  initialState,
  reducers: {
    set: (_state, action) => {
      return action.payload
    },
    reset: () => {
      return initialState
    }
  }
})

export const { set, reset } = organisationSlice.actions;

export const setOrganisation = (organisation:OrganisationData) => {
  console.log("organisation", organisation)
  return (dispatch:AppDispatch) => {
    dispatch(set(organisation))
  }
}

export default organisationSlice.reducer