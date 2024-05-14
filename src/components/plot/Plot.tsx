import {addDeviceToPlot, removeDeviceFromPlot, Plot as PlotData} from "../../reducers/plotsReducer.ts";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {DeviceData} from "../../reducers/devicesReducer.ts";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from '@mui/material/Select';
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";
import {useAppDispatch} from "../../hooks/hooks.ts";

interface PlotProps {
    plot: PlotData,
    devices: Array<DeviceData>,
    onRemoveClick: (plotId: string) => void
}



function Plot(props: PlotProps) {
    const dispatch = useAppDispatch()
    const {plot, onRemoveClick, devices} = props
    const [addDeviceValue, setAddDeviceValue] = useState("")

    const submitAddDevice = (plotId: string) => {
        console.log("submit", addDeviceValue)
        dispatch(addDeviceToPlot(plotId, {device: addDeviceValue, parameters: []}))
    }

    const clickRemoveDevice = (plotId: string, deviceId: string) => {
        dispatch(removeDeviceFromPlot(plotId, deviceId))
    }

    return (
        <>
            <Typography>
                {plot.id}
            </Typography>
            <Typography>
                Devices:
            </Typography>
            {
                plot.devices?.map((device) => (

                    <Typography key={device.device}>
                        {device.device}
                        <Button onClick={() => clickRemoveDevice(plot.id, device.device)}>remove</Button>
                    </Typography>

                ))
            }
            <Button onClick={() => onRemoveClick(plot.id)}>remove</Button>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Device</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Device"
                        value={addDeviceValue}
                        onChange={(event) => {
                            setAddDeviceValue(event.target.value);
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {devices.map((device) => (
                            <MenuItem key={device.id} value={device.id}>{device.name}</MenuItem>
                        ))}
                    </Select>
                    <Button onClick={() => submitAddDevice(plot.id)}>add device</Button>
                </FormControl>
            </Box>

        </>
    )
}

export default Plot