import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../reducers/loggedUserReducer'
import measurementFormReducer from "../reducers/plotConfigurationReducer.js";
import devicesReducer from "../reducers/devicesReducer.js";
import organisationReducer from "../reducers/organisationsReducer.js"
import unitsReducer from "../reducers/unitsReducer.js";



const store = configureStore({
  reducer: {
    auth: authReducer,
    measurementForm: measurementFormReducer,
    devices: devicesReducer,
    organisation: organisationReducer,
    units: unitsReducer
  },
});

export default store;