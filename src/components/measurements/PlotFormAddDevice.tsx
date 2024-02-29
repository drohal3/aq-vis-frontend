import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import {useState} from "react";
import {addMeasurementDevice} from "@src/reducers/plotConfigurationReducer";
import {useAppDispatch} from "@src/hooks/hooks";

export default function PlotFormAddDevice({afterConfirmClick, afterCancelClick, devices}) {
  const dispatch = useAppDispatch();
  const [deviceToAdd, setDeviceToAdd] = useState("")

  const handleAddDeviceSelectChange = (event) => {
    console.log(event.target.value)
    setDeviceToAdd(event.target.value)
  }

  const handleConfirmDevice = () => {
    dispatch(addMeasurementDevice(deviceToAdd))
    setDeviceToAdd("")
    afterConfirmClick()
  }

  const handleCancelClick = () => {
    afterCancelClick()
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Device</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={deviceToAdd}
            label="Device"
            onChange={handleAddDeviceSelectChange}
          >
            {
              devices.map((device) => {
                return (<MenuItem key={device.code} value={device.code}>{device.name}</MenuItem>)
              })
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <Button onClick={handleConfirmDevice} fullWidth={true} variant="contained" startIcon={<CheckIcon />}>
          Confirm
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <Button fullWidth={true} variant="outlined" startIcon={<ClearIcon />} onClick={handleCancelClick}>
          Cancel
        </Button>
      </Grid>
    </Grid>
  )
}