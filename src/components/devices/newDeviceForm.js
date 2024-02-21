import TextField from "@mui/material/TextField";
import {useState} from "react";
import Button from "@mui/material/Button";
import deviceService from "../../services/devices"
import {useAuthData} from "../../hooks/useAuthHook";

function NewDeviceForm(){
  const [deviceName, setDeviceName] = useState("")
  const [deviceCode, setDeviceCode] = useState("")
  const auth = useAuthData()

  const handleClick = async () => {
    console.log("handle click")
    const response = await deviceService.create(auth, {
      deviceName, deviceCode, "organisation": auth.organisation
    })
    console.log(response)
  }

  return (
    <>
      <TextField id="device-name" label="Device Name" variant="filled"
                 onChange={(event) => setDeviceName(event.target.value)} />
      <TextField id="device-code" label="Device Code" variant="filled"
                 onChange={(event) => setDeviceCode(event.target.value)}/>
      <Button variant="contained" onClick={handleClick}>Contained</Button>
    </>
  )
}

export default NewDeviceForm