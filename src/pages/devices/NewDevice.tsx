import AppLayout from "../../components/AppLayout.tsx";
import Typography from "@mui/material/Typography";
import NewDeviceForm from "../../components/devices/newDeviceForm.tsx";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";

function NewDevice(){
  const navigate = useNavigate()

  return (
    <>
      <AppLayout>
        <Typography variant="h4" gutterBottom>
          New Device
        </Typography>
        <Box maxWidth="600px">
          <NewDeviceForm onCancelClick={() => {navigate("/devices")}} onConfirmClick={() => {navigate("/devices")}}/>
        </Box>
      </AppLayout>
      {/*{devices.map((device, key) => (<p key={key}>{device.name}</p>))}*/}
    </>
  )
}

export default NewDevice