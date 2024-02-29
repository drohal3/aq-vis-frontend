import {useAppSelector} from "./hooks.ts";

export const useMeasurementData = () => {
  return useAppSelector((state) => state.measurementForm);
}