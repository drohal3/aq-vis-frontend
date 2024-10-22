import { createSlice } from '@reduxjs/toolkit'
import {AppDispatch} from "../utils/store.ts";

const initialState = {
  id: null,
  name: null,
  members: []
}

export interface OrganisationMember {
  email: string;
  full_name: string;
  organisation: string;
  id: string;
  is_admin: string;
  disabled: boolean;
}

export interface OrganisationData {
  id: string|null;
  name: string|null;
  members: OrganisationMember[]|null;
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