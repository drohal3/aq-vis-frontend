import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import {useState} from "react";
import {addMeasurementDevice} from "../../reducers/measurementFormReducer";
import {useDispatch} from "react-redux";

export default function PlotFormAddDevice({afterConfirmClick, afterCancelClick, devices}) {
  const dispatch = useDispatch();
  const [device_to_add, set_device_to_add] = useState("")

  const handleAddDeviceSelectChange = (event) => {
    console.log(event.target.value)
    set_device_to_add(event.target.value)
  }

  const handleConfirmDevice = () => {
    dispatch(addMeasurementDevice(device_to_add))
    set_device_to_add("")
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
            value={device_to_add}
            label="Device"
            onChange={handleAddDeviceSelectChange}
          >
            {
              devices.map((device) => {
                return (<MenuItem key={device.deviceId} value={device.deviceId}>{device.name}</MenuItem>)
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