import { configureStore } from "@reduxjs/toolkit";
// import blogReducer from "../reducers/blogReducer";
// import alertReducer from "../reducers/alertReducer";
// import authReducer from '../reducers/loggedUserReducer'

// TODO: create root reducer with combineReducers
const store = configureStore({
  reducer: {
    // auth: authReducer,
    // alerts: alertReducer,
  },
});

export default store;