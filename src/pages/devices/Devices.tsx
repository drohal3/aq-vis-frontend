import {useAuthData} from "../../hooks/useAuthHook.js";
import AppLayout from "../../components/AppLayout.tsx";
import {useEffect} from "react";
import deviceService from "../../services/devices"
import Box from "@mui/material/Box";
import {setDevices} from "../../reducers/devicesReducer";
import {useDevicesData} from "../../hooks/useDevicesDataHook.js";
import DevicesTable from "../../components/devices/devicesTable.tsx";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/hooks.ts";

function Devices(){
  // const [newDeviceFormOpen, setNewDeviceFormOpen] = useState(false)
  const dispatch = useAppDispatch()
  const devices = useDevicesData()
  const navigate = useNavigate();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const auth = useAuthData()

  return (
    <>
      <AppLayout title="Devices">
        <Stack direction="row" spacing={2} sx={{p: 2}}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/devices/new')}>
            Add Device
          </Button>
        </Stack>
        <Box maxWidth="1200px">
          <DevicesTable devices={devices} />
        </Box>

      </AppLayout>
      {/*{devices.map((device, key) => (<p key={key}>{device.name}</p>))}*/}
    </>
  )
}

export default Devices