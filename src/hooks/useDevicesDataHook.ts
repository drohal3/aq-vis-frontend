import { useAppSelector } from "@src/hooks/hooks";

export const useDevicesData = () => {
  return useAppSelector((state) => state.devices);
}