import {useAppSelector} from "./hooks.ts";
import {LoadedPlotData} from "../reducers/plotDataReducer.ts";

export const usePlotData = (plotId:string): LoadedPlotData|undefined => {
    const data = useAppSelector((state) => state.plotData);

    return data.find((d) => d.plotId === plotId)
}