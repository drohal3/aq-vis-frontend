import deviceService from "../services/devices"
import AppLayout from "../components/AppLayout.tsx";
import {useEffect} from "react";
import {setDevices} from "../reducers/devicesReducer.ts";
import {useAuthData} from "../hooks/useAuthHook.ts";
import {useAppDispatch} from "../hooks/hooks.ts";
import {useDevicesData} from "../hooks/useDevicesDataHook.ts";
import {addNotification} from "../utils/notifications.ts";

import Plots from "../components/plot/Plots.tsx";

function Measurements(){
  const dispatch = useAppDispatch()
  const devices = useDevicesData()
  const auth = useAuthData()

  useEffect(() => {
    const loadDevices = async () => {
      let devices = await deviceService.get(auth)
      if (devices == null) {
        addNotification(dispatch, "Something went wrong, contact admin for more details!", "error", 10)
        devices = []
      }
      dispatch(setDevices(devices))
      console.log("loaded devices", devices)
    }

    if (devices.length === 0) {
      loadDevices()
    } else {
      console.log("devices already loaded", devices)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  return (
    <AppLayout title="Measurements">
      <Plots/>
    </AppLayout>
  )
}

export default Measurements