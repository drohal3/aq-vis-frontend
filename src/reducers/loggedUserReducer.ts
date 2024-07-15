import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from "../utils/store.ts";

export interface CurrentUser {
  username: string;
  email: string;
  full_name: string;
  organisation: string;
  disabled: boolean
}

export interface AuthData {
  token: string | null;
  currentUser: CurrentUser | null;
}

const initialState = {
  token: null,
  currentUser: null
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


export const setUser = (user:AuthData) => {
  console.log("reducer - SignIn")
  return (dispatch: AppDispatch) => {
    window.localStorage.setItem("IdealAQConsoleUserToken", user.token ?? "")
    dispatch(set(user));
  }
}

export const signOut = () => {
  console.log("reducer - SignOut")
  window.localStorage.removeItem("IdealAQConsoleUserToken")
  console.log("item removed", window.localStorage.getItem("IdealAQConsoleUserToken"))
  return (dispatch: AppDispatch) => {
    dispatch(reset());
  }
}

export default userSlice.reducer