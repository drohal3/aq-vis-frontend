import AppLayout from "../../components/AppLayout";
import Typography from "@mui/material/Typography";
import NewDeviceForm from "../../components/devices/newDeviceForm";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";


function Device({device}) {
  return (
    <p>
      {device.id}
    </p>
  )
}

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