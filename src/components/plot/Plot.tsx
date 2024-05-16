import {addDeviceToPlot, removeDeviceFromPlot, Plot as PlotData, DeviceToPlot} from "../../reducers/plotsReducer.ts";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {DeviceData} from "../../reducers/devicesReducer.ts";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from '@mui/material/Select';
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import {useAppDispatch} from "../../hooks/hooks.ts";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Stack} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TuneIcon from '@mui/icons-material/Tune';
import { useTheme } from '@mui/material/styles';
import {Fragment, useState} from "react";
import AddIcon from "@mui/icons-material/Add";

function DeviceConfiguration() {
    return (
        <>
        </>
    )
}

function AddDeviceDialog({plot, devicesToAdd, confirmAction}:{plot: PlotData,devicesToAdd:DeviceData[], confirmAction: (plotId: string, deviceId: string) => void}) {
    // https://mui.com/material-ui/react-dialog/
    const [open, setOpen] = useState(false);
    const [addDeviceValue, setAddDeviceValue] = useState("")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const resetAddDeviceValue = () => {
        setAddDeviceValue("")
    }

    const confirmClick = () => {
        confirmAction(plot.id, addDeviceValue)
        resetAddDeviceValue()
        handleClose()
    }

    return (
        <Fragment>
            <Button
                variant="outlined"
                onClick={handleClickOpen}
                startIcon={<AddIcon/>}
                disabled={devicesToAdd.length == 0}
            >
                Add device to plot
            </Button>
            <Dialog
                fullWidth
                maxWidth="md"
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Add device to plot #{plot.id}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Choose device to be added to the plot.
                    </DialogContentText>
                    <Box sx={{marginTop: 2}}>
                        <FormControl fullWidth size="small">
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
                                {devicesToAdd.map((device) => (
                                    <MenuItem key={device.id} value={device.id}>{device.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        disabled={addDeviceValue == ""}
                        onClick={confirmClick}
                    >
                        Confirm
                    </Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

interface PlotProps {
    plot: PlotData,
    devices: Array<DeviceData>,
    onRemoveClick: (plotId: string) => void
}

function Plot(props: PlotProps) {
    const [addDeviceValue, setAddDeviceValue] = useState("")

    const theme = useTheme()
    const dispatch = useAppDispatch()
    const {plot, onRemoveClick, devices} = props
    const selectedDevices = plot.devices.map((device) => device.device)

    const submitAddDevice = (plotId: string, deviceId: string) => {
        console.log("submit", addDeviceValue)
        dispatch(addDeviceToPlot(plotId, {device: deviceId, parameters: []}))
        setAddDeviceValue("")
    }

    const clickRemoveDevice = (plotId: string, deviceId: string) => {
        dispatch(removeDeviceFromPlot(plotId, deviceId))
    }

    const deviceById = (deviceId: string) => {
        return devices.find((device) => device.id == deviceId)
    }

    return (
        <Box
            sx={{
                border: `1px solid ${theme.palette.primary.main}`,
            }}>

            <Stack
                direction="row"
                useFlexGap
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    p: 2,
                    color: theme.palette.primary.contrastText
                }}
            >
                <Stack
                    direction="row"
                    useFlexGap
                    flexWrap="wrap"
                    alignItems="center"
                    divider={<Divider orientation="vertical" flexItem sx={{p:1}} />}
                >
                    <Typography>
                        Plot #{plot.id}
                    </Typography>
                    <Button
                        startIcon={<TuneIcon/>}
                        variant="contained"
                        disableElevation
                    >
                        Configure plot
                    </Button>
                </Stack>

                <Button
                    onClick={() => onRemoveClick(plot.id)}
                    startIcon={<DeleteIcon />}
                    variant="contained"
                    disableElevation
                >
                    Remove plot
                </Button>
            </Stack>
            <Box sx={{p:2, backgroundColor: theme.palette.primary.light}}>
                <Box sx={{marginTop: 2}}>
                    <Typography>
                        Devices:
                    </Typography>
                    {
                        plot.devices?.map((device) => (
                            <Typography key={device.device}>
                                {deviceById(device.device)?.name}
                                <Button onClick={() => clickRemoveDevice(plot.id, device.device)}>remove device</Button>
                            </Typography>
                        ))
                    }
                    <AddDeviceDialog confirmAction={submitAddDevice} plot={plot} devicesToAdd={devices.filter((device) => !selectedDevices.includes(device.id ? device.id : ""))} />

                </Box>
            </Box>
            <Box sx={{p:2}}>
                <Typography>Plot will be here</Typography>
            </Box>
        </Box>
    )
}

export default Plot