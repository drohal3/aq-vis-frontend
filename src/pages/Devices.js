import {useAuthData} from "../hooks/useAuthHook";
import AppLayout from "../components/AppLayout";
import Typography from "@mui/material/Typography";
import NewDeviceForm from "../components/devices/newDeviceForm";
import {useEffect} from "react";
import deviceService from "../services/devices"
import Box from "@mui/material/Box";


function Devices(){
  useEffect(() => {
    const loadDevices = async () => {
      const devices = await deviceService.get(auth)
      console.log(devices)
    }

    loadDevices()
  }, []);

  const auth = useAuthData()

  return (
    <>
      <AppLayout>
        <Typography variant="h4" gutterBottom>
          Devices
        </Typography>
        <Typography>
          TODO: mapping device ID - Device Name, restricted access, organisation
        </Typography>
        <Box maxWidth="400px">
          <NewDeviceForm />
        </Box>
      </AppLayout>
      {/*{devices.map((device, key) => (<p key={key}>{device.name}</p>))}*/}
    </>
  )
}

export default Devices