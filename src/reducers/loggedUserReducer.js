import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  username: null,
  name: null
}

const userSlice = createSlice({ // TODO: use cookies/cache instead
  name: 'auth',
  initialState,
  reducers: {
    set: (state, action) => { //login
      return action.payload
    },
    reset: () => { //logout
      return initialState
    }
  }
})

export const { set, reset } = userSlice.actions;


export const setUser = (user) => {
  return (dispatch) => { // TODO: caches/cookies?
    window.localStorage.setItem("IdealAQConsoleUserToken", user.token)
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