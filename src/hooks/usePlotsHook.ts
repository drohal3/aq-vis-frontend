import {useAppSelector} from "./hooks.ts";

export const usePlotsConfigurationState = () => {
    return useAppSelector((state) => state.plots);
}