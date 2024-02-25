import {useAuthData} from "../hooks/useAuthHook";
import AppLayout from "../components/AppLayout";
import Typography from "@mui/material/Typography";
import NewDeviceForm from "../components/devices/newDeviceForm";
import {useEffect, useState} from "react";
import deviceService from "../services/devices"
import Box from "@mui/material/Box";
import DevicesService from "../services/devices"
import {useDispatch} from "react-redux";
import {setDevices} from "../reducers/devicesReducer";
import {useDevicesData} from "../hooks/useDevicesDataHook";


function Device({device}) {
  return (
    <p>
      {device.id}
    </p>
  )
}

function Devices(){
  const [newDeviceFormOpen, setNewDeviceFormOpen] = useState(false)
  const dispatch = useDispatch()
  const devices = useDevicesData()

  useEffect(() => {
    const loadDevices = async () => {
      const devices = await deviceService.get(auth)
      dispatch(setDevices(devices))
      console.log("loaded devices", devices)
    }

    if (devices.length === 0) {
      loadDevices()
    } else {
      console.log("devices already loaded", devices)
    }

  }, []);

  const auth = useAuthData()

  return (
    <>
      <AppLayout>
        <Typography variant="h4" gutterBottom>
          Devices
        </Typography>
        <Box maxWidth="600px">
          <NewDeviceForm />
        </Box>
        <Typography>
          list devices in table?
        </Typography>
        {devices.map(device => (<Device key={device.id} device={device} /> ))}
      </AppLayout>
      {/*{devices.map((device, key) => (<p key={key}>{device.name}</p>))}*/}
    </>
  )
}

export default Devices