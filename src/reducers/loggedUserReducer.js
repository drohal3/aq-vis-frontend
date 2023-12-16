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
      console.log("step 3 - changing the state, new state: ", action.payload)
      return action.payload
    },
    reset: () => { //logout
      return initialState
    }
  }
})

export const { set, reset } = userSlice.actions;


export const setUser = (user) => {

  console.log("step 2 - user reducer", user);
  return (dispatch) => { // TODO: caches/cookies?
    dispatch(set(user));
  }
}

export const signOut = () => {
  window.localStorage.removeItem("IdealAQUser")
  return (dispatch) => {
    dispatch(reset());
  }
}

export default userSlice.reducer