import {useAppSelector} from "./hooks.ts";

export const usePlotsData = () => {
    return useAppSelector((state) => state.plots);
}