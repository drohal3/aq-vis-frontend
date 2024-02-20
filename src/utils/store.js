import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../reducers/loggedUserReducer'
import measurementFormReducer from "../reducers/plotConfigurationReducer";
import devicesReducer from "../reducers/devicesReducer";
import organisationReducer from "../reducers/organisationsReducer"

// TODO: create root reducer with combineReducers
const store = configureStore({
  reducer: {
    auth: authReducer,
    measurementForm: measurementFormReducer,
    devices: devicesReducer,
    organisation: organisationReducer,
  },
});

export default store;