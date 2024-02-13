import {useAuthData} from "../hooks/useAuthHooks";
import AppLayout from "../components/AppLayout";
import Typography from "@mui/material/Typography";

function Devices(){
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
      </AppLayout>
      {/*{devices.map((device, key) => (<p key={key}>{device.name}</p>))}*/}
    </>
  )
}

export default Devices