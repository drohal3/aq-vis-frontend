import {useAppSelector} from "@src/hooks/hooks";

export const useMeasurementData = () => {
  return useAppSelector((state) => state.measurementForm);
}