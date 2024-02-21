import TextField from "@mui/material/TextField";
import {useState} from "react";
import Button from "@mui/material/Button";
import deviceService from "../../services/devices"
import {useAuthData} from "../../hooks/useAuthHook";

function NewDeviceForm(){
  const [name, setDeviceName] = useState("")
  const [code, setDeviceCode] = useState("")
  const auth = useAuthData()

  const handleClick = async () => {
    console.log("handle click")
    const response = await deviceService.create(auth, {
      name, code, "organisation": auth.organisation
    })
    console.log(response)
  }

  return (
    <>
      <TextField id="device-name" label="Device Name" variant="filled" value={name}
                 onChange={(event) => setDeviceName(event.target.value)} />
      <TextField id="device-code" label="Device Code" variant="filled" value={code}
                 onChange={(event) => setDeviceCode(event.target.value)}/>
      <Button variant="contained" onClick={handleClick}>Contained</Button>
    </>
  )
}

export default NewDeviceForm