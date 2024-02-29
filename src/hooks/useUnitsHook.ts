import {useAppSelector} from "@src/hooks/hooks";

export const useUnitsData = () => {
  return useAppSelector((state) => state.units);
}