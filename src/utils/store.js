import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../reducers/loggedUserReducer'
import measurementFormReducer from "../reducers/measurementFormReducer";
import devicesReducer from "../reducers/devicesReducer";

// TODO: create root reducer with combineReducers
const store = configureStore({
  reducer: {
    auth: authReducer,
    measurementForm: measurementFormReducer,
    devices: devicesReducer,
  },
});

export default store;