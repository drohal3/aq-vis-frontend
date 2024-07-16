import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "./loggedUserReducer.ts";
import devicesReducer from "./devicesReducer.ts";
import organisationReducer from "./organisationsReducer.ts";
import unitsReducer from "./unitsReducer.ts";
import plotsReducer from "./plotConfigurationsReducer.ts";
import loadedPlotDataReducer from "./plotDataReducer.ts";
import notificationReducer from "./notificationReducer.ts";

const appReducer = combineReducers({
    auth: authReducer,
    // measurementForm: measurementFormReducer,
    devices: devicesReducer,
    organisation: organisationReducer,
    units: unitsReducer,
    plots: plotsReducer,
    plotData: loadedPlotDataReducer,
    notifications: notificationReducer
});

export const rootReducer = (state:any, action:any) => { // eslint-disable-line
    console.log("root reducer action: ", action.type)
    if (action.type === 'reset') {
        state = undefined;
    }
    return appReducer(state, action);
}

export const resetReduxStore = () => {

    return {
        type: 'reset'
    };
};