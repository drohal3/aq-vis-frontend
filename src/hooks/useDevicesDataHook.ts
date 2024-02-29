import { useAppSelector} from "./hooks.ts";

export const useDevicesData = () => {
  return useAppSelector((state) => state.devices);
}