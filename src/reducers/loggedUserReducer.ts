import { createSlice } from '@reduxjs/toolkit'

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
  return (dispatch) => {
    window.localStorage.setItem("IdealAQConsoleUserToken", user.token ?? "")
    dispatch(set(user));
  }
}

export const signOut = () => {
  window.localStorage.removeItem("IdealAQConsoleUserToken")
  return (dispatch) => {
    dispatch(reset());
  }
}

export default userSlice.reducer