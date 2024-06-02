import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit'
import {AppDispatch} from "../utils/store.ts";

// export interface MeasurementParameter {
//     parameter: string
//     unit: string
// }

export interface DeviceToPlot {
    device: string,
    parameters: Array<ParameterConfig>
}

export interface Plot {
    id: string
    devices: Array<DeviceToPlot>
}

export interface ParameterConfig {
    id: string
    parameter: string | undefined
    hexColor: string
}

interface AddParameterProps {
    deviceId: string
    plotId: string
    parameter: ParameterConfig
}

// const defaultPlotData = {
//     name: "Plot",
//     measurements: []
// }

const initialState = Array<Plot>()

const plotsSlice = createSlice({
    name: "measurements",
    initialState,
    reducers: {
        add: {
            reducer: (state, action: PayloadAction<Plot>) => {
                return [...state, action.payload]
            },
            prepare: (measurements: Array<DeviceToPlot>) => {
                const id = nanoid()
                return { payload: { id, devices: measurements } }
            }
        },
        remove: (state, action) => {
            const plotId = action.payload
            return state.filter((plot) => plot.id != plotId)
        },
        reset: () => { //logout
            return initialState
        },
        addDevice: (state, action) => {
            const { plotId, deviceToPlot } = action.payload
            state.map((plot) => {
                if (plot.id == plotId) {
                    plot.devices.push(deviceToPlot)
                }
            })
        },
        removeDevice: (state, action) => {
            const {plotId, deviceId} = action.payload
            const plot = state.find((plot) => plot.id == plotId)
            if (plot) {
                plot.devices = plot.devices.filter((device) => device.device != deviceId)
            }
        },
        addParameter: {
            reducer: (state, action: PayloadAction<AddParameterProps>) => {
                const {plotId, deviceId, parameter} = action.payload
                const plot = state.find((plot) => plot.id == plotId)
                if (!plot) {
                    return
                }
                const device = plot.devices.find((device) => device.device == deviceId)
                if (!device) {
                    return
                }
                device.parameters.push(parameter)
            },
            prepare: (plotId: string, deviceId: string, parameter: string|undefined, hexColor: string) => {
                const id = nanoid()
                return { payload: {plotId, deviceId, parameter: {id, parameter, hexColor}}}
            }
        },
        updateParameter: (state, action) => {
            const {plotId, deviceId, newValue} = action.payload
            const plot = state.find((plot) => plot.id == plotId)
            if (!plot) {
                return
            }
            const device = plot.devices.find((device) => device.device == deviceId)
            if (!device) {
                return
            }
            device.parameters = device.parameters.map((parameter) => parameter.id != newValue.id ? parameter : newValue)
        },
        removeParameter: (state, action) => {
            const {plotId, deviceId, parameterId} = action.payload
            const plot = state.find((plot) => plot.id == plotId)
            if (!plot) {
                return
            }
            const device = plot.devices.find((device) => device.device == deviceId)
            if (!device) {
                return
            }
            device.parameters = device.parameters.filter((parameter) => parameter.id != parameterId)
        }
    }
})

export const {
    add,
    remove,
    reset,
    addDevice,
    removeDevice,
    addParameter,
    removeParameter,
    updateParameter
} = plotsSlice.actions;

export const resetPlots = () => {
    return (dispatch:AppDispatch) => {
        dispatch(reset())
    }
}

export const addPlot = (measurements: Array<DeviceToPlot> = []) => {
    console.log("adding plot (addPlot)", measurements)
    return (dispatch:AppDispatch) => {
        dispatch(add(measurements))
    }
}

export const removePlot = (plotId: string) => {
    console.log("removing plot", plotId)
    return (dispatch:AppDispatch) => {
        dispatch(remove(plotId))
    }
}

export const addDeviceToPlot = (plotId: string, deviceToPlot:DeviceToPlot) => {
    return (dispatch:AppDispatch) => {
        dispatch(addDevice({plotId, deviceToPlot}))
    }
}

export const removeDeviceFromPlot = (plotId: string, deviceId: string) => {
    return (dispatch:AppDispatch) => {
        dispatch(removeDevice({
            plotId, deviceId
        }))
    }
}

export const addParameterToDeviceToPlot = (plotId: string, deviceId: string, parameter: string|undefined = undefined, hexColor: string = "#000000") => {
    return (dispatch:AppDispatch) => {
        dispatch(addParameter(plotId, deviceId, parameter, hexColor))
    }
}

export const removeParameterFromDeviceToPlot = (parameterId: string, plotId: string, deviceId: string) => {
    return (dispatch:AppDispatch) => {
        dispatch(removeParameter({plotId, deviceId, parameterId}))
    }
}

export const updateParameterFromDeviceToPlot = (plotId: string, deviceId: string, newValue: ParameterConfig) => {
    return (dispatch:AppDispatch) => {
        dispatch(updateParameter({
            plotId, deviceId, newValue
        }))
    }
}

export default plotsSlice.reducer