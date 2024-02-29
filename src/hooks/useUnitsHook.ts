import {useAppSelector} from "./hooks.ts";

export const useUnitsData = () => {
  return useAppSelector((state) => state.units);
}