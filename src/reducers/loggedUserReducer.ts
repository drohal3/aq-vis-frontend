import { createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'redux';

export interface AuthState {
  token: string;
  username: string;
  name: string;
}

const initialState = {
  token: null,
  username: null,
  name: null
}

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    set: (_state, action) => { //login
      return action.payload
    },
    reset: () => { //logout
      return initialState
    }
  }
})

export const { set, reset } = userSlice.actions;


export const setUser = (user:AuthState) => {
  return (dispatch: Dispatch) => {
    window.localStorage.setItem("IdealAQConsoleUserToken", user.token)
    dispatch(set(user));
  }
}

export const signOut = () => {
  window.localStorage.removeItem("IdealAQConsoleUserToken")
  return (dispatch: Dispatch) => {
    dispatch(reset());
  }
}

export default userSlice.reducer