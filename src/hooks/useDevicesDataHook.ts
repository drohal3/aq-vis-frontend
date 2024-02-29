import { useAppSelector} from "./hooks.ts";
import {DeviceData} from "../reducers/devicesReducer.ts";

export const useDevicesData = ():Array<DeviceData> => {
  return useAppSelector((state) => state.devices);
}