import {
    addDeviceToPlot,
    removeDeviceFromPlot,
    addParameterToDeviceToPlot,
    removeParameterFromDeviceToPlot,
    Plot as PlotData,
    ParameterConfig
} from "../../reducers/plotsReducer.ts";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {DeviceData} from "../../reducers/devicesReducer.ts";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import {useAppDispatch} from "../../hooks/hooks.ts";
import {
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Stack
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TuneIcon from '@mui/icons-material/Tune';
import { useTheme } from '@mui/material/styles';
import {Fragment, useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";


function ParameterConfiguration({parameter, device, plotId}:{parameter:ParameterConfig, device:DeviceData|undefined, plotId:string|undefined}) {
    const dispatch = useAppDispatch()

    const [selectedParameter, setSelectedParameter] = useState("")
    const [color, setColor] = useState({});

    console.log("param config device:", device)
    const removeParameterClick = () => {
        if (plotId && device && device.id) {
            dispatch(removeParameterFromDeviceToPlot(parameter.id, plotId, device.id))
        }
    }

    console.log("color", color)

    return (
        <Box>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 2, md: 3 }}>
                <Grid item xs={12} md={3} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Parameter</InputLabel>
                        <Select
                            label="Parameter"
                            value={selectedParameter}
                            onChange={(event: SelectChangeEvent) => setSelectedParameter(event.target.value as string)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {device?.parameters.map(
                                (parameter) => (
                                    <MenuItem key={parameter.code} value={parameter.code}>{parameter.name}</MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={2} lg={1} justifyContent="center">
                    <TextField size="small" fullWidth label="Color" variant="outlined" />
                </Grid>
            </Grid>

            <Button
                onClick={removeParameterClick}
            >Delete</Button>
        </Box>
    )
}

function DeviceConfiguration({device, plot}:{device:DeviceData | undefined, plot:PlotData}) {
    const dispatch = useAppDispatch()
    const theme = useTheme()

    console.log("device", device)
    console.log("plot", plot)

    const plotDevice = plot.devices?.find((d)=> d.device == device?.id)
    const plotParameters = plotDevice?.parameters

    console.log("plotDevice", plotDevice)
    console.log("plotParameters", plotParameters)

    const addParameterClick = () => {
        if (device && device.id) {
            dispatch(addParameterToDeviceToPlot(plot.id, device.id))
        }
    }

    const removeClick = () => {
        if (device != undefined) {
            dispatch(removeDeviceFromPlot(plot.id, device.id ?? ""))
        }
    }

    const parametersConfiguration = plotParameters && plotParameters.length > 0 ? (
        plotParameters.map((plotParameter) => (
            <ParameterConfiguration
                parameter={plotParameter}
                device={device}
                plotId={plot.id}
                key={plotParameter.id}
            />
        ))
    ) : (
        <Alert severity="info">No parameter added!</Alert>
    )

    return device && (
        <>
            <Box sx={{my: 1, border: `1px solid ${theme.palette.primary.main}`, backgroundColor: theme.palette.common.white}}>
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
                    <Typography>Device: {device.name}</Typography>

                    <Button startIcon={<DeleteIcon/>} variant="contained" disableElevation onClick={() => removeClick()}>remove device</Button>
                </Stack>
                <Box sx={{p:2}}>
                    <Stack spacing={2}>
                        {parametersConfiguration}
                    </Stack>
                    <Button
                        startIcon={<AddIcon/>}
                        variant="outlined"
                        fullWidth
                        disableElevation
                        onClick={addParameterClick}
                    >
                        Add parameter
                    </Button>
                </Box>


            </Box>
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

    const deviceConfig = plot.devices && plot.devices?.length > 0 ? plot.devices?.map((device) => (
        <Box key={device.device}>
            <DeviceConfiguration device={deviceById(device.device)} plot={plot} />
        </Box>
    )) : (<Alert severity="info">No device added!</Alert>)

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
                {deviceConfig}
                <AddDeviceDialog confirmAction={submitAddDevice} plot={plot} devicesToAdd={devices.filter((device) => !selectedDevices.includes(device.id ? device.id : ""))} />
            </Box>
            <Box sx={{p:10}}>
                <Typography variant="h1">Plot will be here!</Typography>
            </Box>
        </Box>
    )
}

export default Plot