import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit'
import {AppDispatch} from "../utils/store.ts";

export interface ParameterToPlotState {
    id: string
    parameter: string | undefined
    hexColor: string
}
export interface DeviceToPlotState {
    deviceCode: string,
    parameters: Array<ParameterToPlotState>
}

export interface PlotConfigurationState {
    id: string,
    current: Array<DeviceToPlotState>, // state of configuration, edit mode
    loaded: Array<DeviceToPlotState>, // last loaded configuration
    modified?: boolean
}

interface AddParameterProps {
    deviceCode: string
    plotId: string
    parameter: ParameterToPlotState
}

// const defaultPlotData = {
//     name: "Plot",
//     measurements: []
// }

const initialState = Array<PlotConfigurationState>()

const plotsSlice = createSlice({
    name: "measurements",
    initialState,
    reducers: {
        add: {
            reducer: (state, action: PayloadAction<PlotConfigurationState>) => {
                return [...state, action.payload]
            },
            prepare: (measurements: Array<DeviceToPlotState>) => {
                const id = nanoid()
                return { payload: { id, current: measurements, loaded: [] } }
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
                    plot.current.push(deviceToPlot)
                    plot.modified = true
                }
            })
        },
        removeDevice: (state, action) => {
            const {plotId, deviceCode} = action.payload
            const plot = state.find((plot) => plot.id == plotId)
            if (plot) {
                plot.current = plot.current.filter((device) => device.deviceCode != deviceCode)
                plot.modified = true
            }
        },
        addParameter: {
            reducer: (state, action: PayloadAction<AddParameterProps>) => {
                const {plotId, deviceCode, parameter} = action.payload
                console.log("searching for", deviceCode)

                const plot = state.find((plot) => plot.id == plotId)
                if (!plot) {
                    console.log("!!!! PLOT NOT FOUND")
                    return
                }
                const device = plot.current.find((device) => device.deviceCode == deviceCode)
                if (!device) {
                    console.log("!!!! DEVICE NOT FOUND")
                    return
                }
                device.parameters.push(parameter)
                plot.modified = true
            },
            prepare: (plotId: string, deviceCode: string, parameter: string|undefined, hexColor: string) => {
                const id = nanoid()
                return { payload: {plotId, deviceCode, parameter: {id, parameter, hexColor}}}
            }
        },
        updateParameter: (state, action) => {
            const {plotId, plotCode, newValue} = action.payload
            const plot = state.find((plot) => plot.id == plotId)
            if (!plot) {
                return
            }
            const device = plot.current.find((device) => device.deviceCode == plotCode)
            if (!device) {
                return
            }
            device.parameters = device.parameters.map((parameter) => parameter.id != newValue.id ? parameter : newValue)
            plot.modified = true
        },
        removeParameter: (state, action) => {
            const {plotId, plotCode, parameterId} = action.payload
            const plot = state.find((plot) => plot.id == plotId)
            if (!plot) {
                return
            }
            const device = plot.current.find((device) => device.deviceCode == plotCode)
            if (!device) {
                return
            }
            device.parameters = device.parameters.filter((parameter) => parameter.id != parameterId)
            plot.modified = true
        },
        confirmPlot: (state, action: PayloadAction<{plotId: string}>) => {
            const { plotId } = action.payload
            const plot = state.find(p => p.id == plotId)
            if (!plot) {
                return
            }
            const current = plot.current
            plot.loaded = [...current]
            plot.modified = false
        },
        revertPlot: (state, action) => {
            const { plotId } = action.payload
            const plot = state.find(p => p.id == plotId)
            if (!plot) {
                return
            }
            const loaded = plot.loaded
            plot.current = [...loaded]
            plot.modified = false
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
    updateParameter,
    confirmPlot,
    revertPlot
} = plotsSlice.actions;

// export const resetPlots = () => {
//     return (dispatch:AppDispatch) => {
//         dispatch(reset())
//     }
// }

export const addPlot = (measurements: Array<DeviceToPlotState> = []) => {
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

export const addDeviceToPlot = (plotId: string, deviceToPlot:DeviceToPlotState) => {
    return (dispatch:AppDispatch) => {
        dispatch(addDevice({plotId, deviceToPlot}))
    }
}

export const removeDeviceFromPlot = (plotId: string, plotCode: string) => {
    return (dispatch:AppDispatch) => {
        dispatch(removeDevice({
            plotId, plotCode
        }))
    }
}

export const addParameterToDeviceToPlot = (plotId: string, plotCode: string, parameter: string|undefined = undefined, hexColor: string = "#000000") => {
    console.log("dispatch", plotCode)
    return (dispatch:AppDispatch) => {
        dispatch(addParameter(plotId, plotCode, parameter, hexColor))
    }
}

export const removeParameterFromDeviceToPlot = (parameterId: string, plotId: string, plotCode: string) => {
    return (dispatch:AppDispatch) => {
        dispatch(removeParameter({plotId, plotCode, parameterId}))
    }
}

export const updateParameterFromDeviceToPlot = (plotId: string, plotCode: string, newValue: ParameterToPlotState) => {
    return (dispatch:AppDispatch) => {
        dispatch(updateParameter({
            plotId, plotCode, newValue
        }))
    }
}

export const confirmPlotToPlot = (plotId: string) => {
    return (dispatch:AppDispatch) => {
        dispatch(confirmPlot({plotId}))
    }
}

export const revertPlotToPlot= (plotId: string) => {
    return (dispatch:AppDispatch) => {
        dispatch(revertPlot({plotId}))
    }
}

export default plotsSlice.reducer