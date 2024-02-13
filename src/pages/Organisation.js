import {useAuthData} from "../hooks/useAuthHook";
import AppLayout from "../components/AppLayout";
import Typography from "@mui/material/Typography";

function Organisation(){
  const auth = useAuthData()

  return (
    <>
      <AppLayout>
        <Typography variant="h4" gutterBottom>
          Organisation
        </Typography>
        <Typography>
          TODO: restricted access, members management
        </Typography>
      </AppLayout>
      {/*{devices.map((device, key) => (<p key={key}>{device.name}</p>))}*/}
    </>
  )
}

export default Organisation