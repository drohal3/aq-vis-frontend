import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppDispatch} from "../utils/store.ts";


export interface LoadedDeviceDataState {
    deviceId: string,
    data: {}[]
}
export interface LoadedPlotDataState {
    plotId: string,
    deviceData: LoadedDeviceDataState[]
}



const initialState = Array<LoadedPlotDataState>()

interface AddLoadedPlotsReducerProps {
    plotId:string,
    deviceId:string,
    data:any[]
}

const loadedPlotsSlice = createSlice({
    name: "loadedPlots",
    initialState,
    reducers: {
        addDeviceData: (state, action:PayloadAction<AddLoadedPlotsReducerProps>) => {
            const {plotId, deviceId, data} = action.payload
            let plotData = state.find(p => p.plotId == plotId)
            if (!plotData) {
                plotData = {plotId, deviceData:[]}
                state.push(plotData)
            }
            let deviceData = plotData.deviceData.find(d => d.deviceId == deviceId)
            if (!deviceData) {
                deviceData = {deviceId, data:[]}
                plotData.deviceData.push(deviceData)
            }
            deviceData.data = data
        },
        reset: () => {
            return initialState
        }
    }
})

export const {addDeviceData} = loadedPlotsSlice.actions

export const addLoadedPlotDeviceData = (plotId: string, deviceId: string, data: any[]) => {
    return (dispatch:AppDispatch) => {
        console.log("adding device data")
        dispatch(addDeviceData({plotId, deviceId, data}))
    }
}

export default loadedPlotsSlice.reducer