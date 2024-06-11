import {useAppSelector} from "./hooks.ts";
import {LoadedPlotDataState} from "../reducers/plotDataReducer.ts";

export const usePlotData = (plotId:string): LoadedPlotDataState|undefined => {
    const data = useAppSelector((state) => state.plotData);

    return data.find((d) => d.plotId === plotId)
}