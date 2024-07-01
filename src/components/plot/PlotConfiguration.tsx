import {
    addDeviceToPlot,
    addParameterToDeviceToPlot,
    ParameterToPlotState,
    PlotConfigurationState,
    PlotConfigurationState as PlotConfigurationData,
    removeDeviceFromPlot,
    removeParameterFromDeviceToPlot, revertPlotToPlot,
    updateParameterFromDeviceToPlot
} from "../../reducers/plotConfigurationsReducer.ts";
import {DeviceData} from "../../reducers/devicesReducer.ts";
import {ChangeEvent, Fragment, useState} from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormHelperText,
    Stack
} from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {useAppDispatch} from "../../hooks/hooks.ts";
import {useTheme} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import UndoIcon from "@mui/icons-material/Undo";

export function AddDeviceDialog({plot, devicesToAdd, confirmAction}:{plot: PlotConfigurationData,devicesToAdd:DeviceData[], confirmAction: (plotId: string, deviceId: string) => void}) {
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
                                    <MenuItem key={device.code} value={device.code}>{device.name}</MenuItem>
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

function ParameterConfiguration({parameter, device, plotId}:{parameter:ParameterToPlotState, device:DeviceData|undefined, plotId:string|undefined}) {
    const deviceCode = device?.code
    const dispatch = useAppDispatch()
    const [colorError, setColorError] = useState("")
    // TODO: plot configuration should be kept in state (useState) and loaded with values from redux when page is loaded
    // TODO: The plot should be loaded from data in the redux
    const removeParameterClick = () => {
        if (plotId && deviceCode) {
            dispatch(removeParameterFromDeviceToPlot(parameter.id, plotId, deviceCode))
        }
    }

    const updateParameter = (value: string) => {
        const newValue = {...parameter, parameter: value}
        if (!plotId || !deviceCode) {
            return
        }

        dispatch(updateParameterFromDeviceToPlot(plotId, deviceCode, newValue))
    }

    const validateHEXColor = (value: string) => {
        return value.match(/^#[a-f|0-9]{6}$/)
    }

    const updateColor = (value: string) => {
        if (!validateHEXColor(value)) {
            setColorError("Error: invalid HEX color")
        } else {
            setColorError("")
        }


        if (!plotId || !deviceCode) {
            return
        }

        const newValue = {...parameter, hexColor: value}
        dispatch(updateParameterFromDeviceToPlot(plotId, deviceCode, newValue))
    }

    return (
        <Box>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 2, md: 3 }}>
                <Grid item xs={12} md={4} lg={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Parameter</InputLabel>
                        <Select
                            label="Parameter"
                            value={parameter.parameter ?? ""}
                            onChange={(event: SelectChangeEvent) => updateParameter(event.target.value as string)}
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
                <Grid item xs={12} md={3} lg={2} justifyContent="center">
                    <FormControl error variant="outlined">
                        <TextField
                            value={parameter.hexColor ?? ""}
                            size="small"
                            fullWidth
                            label="Color"
                            placeholder="#000000"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                updateColor(event.target.value)
                            }}
                        />
                        <FormHelperText>{colorError}</FormHelperText>
                    </FormControl>

                </Grid>
                <Grid item xs={12} md={2} lg={1} justifyContent="center">
                    <Button
                        onClick={removeParameterClick}
                    >Delete</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export function DeviceConfiguration({device, plot}:{device:DeviceData | undefined, plot:PlotConfigurationData}) {
    const dispatch = useAppDispatch()
    const theme = useTheme()

    const plotDevice = plot.current.find((d)=> d.deviceCode == device?.code)
    const plotParameters = plotDevice?.parameters
    const addParameterClick = () => {
        if (device && device.code) {
            dispatch(addParameterToDeviceToPlot(plot.id, device.code))
        }
    }

    const removeClick = () => {
        if (device != undefined) {
            dispatch(removeDeviceFromPlot(plot.id, device.code ?? ""))
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
                    <Stack spacing={2} sx={{paddingBottom: 2}}>
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

export default function PlotConfiguration({plotConfiguration, devices, dateTimeFrom, dateTimeTo, loadData}:{plotConfiguration:PlotConfigurationState, devices: Array<DeviceData>, dateTimeFrom:string, dateTimeTo:string, loadData: (dateTimeFrom: string, dateTimeTo: string) => Promise<void>}){
    const dispatch = useAppDispatch()
    const theme = useTheme()

    const selectedDevices = plotConfiguration.current.map((device) => device.deviceCode)
    console.log("PlotConfiguration - devices: ", devices)
    console.log("PlotConfiguration - selectedDevices: ", selectedDevices)
    const devicesToAdd = devices.filter((device) => !selectedDevices.includes(device.code ? device.code : ""))
    console.log("PlotConfiguration - devicesToAdd: ", devicesToAdd)

    const onLoadPlotDataClick = async () => {
        await loadData(dateTimeFrom, dateTimeTo)
    }
    const revertConfig = () => {
        dispatch(revertPlotToPlot(plotConfiguration.id))
    }

    const deviceByCode = (deviceCode: string):DeviceData|undefined => {
        return devices.find((device) => device.code == deviceCode)
    }

    const submitAddDevice = (plotId: string, deviceId: string) => {
        dispatch(addDeviceToPlot(plotId, {deviceCode: deviceId, parameters: []}))
    }

    const deviceConfig = plotConfiguration.current && plotConfiguration.current?.length > 0 ? plotConfiguration.current?.map((device) => (
        <Box key={device.deviceCode}>
            <DeviceConfiguration device={deviceByCode(device.deviceCode)} plot={plotConfiguration} />
        </Box>
    )) : (<Alert severity="info">No device added!</Alert>)

    const revertMessage = (plotConfiguration.modified && plotConfiguration.loaded.length > 0) ? (
        <Box alignContent="center">
            <Alert
                severity="info"
                action={
                    <Button
                        startIcon={<UndoIcon/>}
                        color="inherit"
                        size="medium"
                        onClick={revertConfig}
                    >
                        UNDO
                    </Button>
                }
            >
                This plot configuration has been modified.
            </Alert>
        </Box>
    ) : null

    console.log("PlotConfiguration - plotConfiguration data: ", plotConfiguration)
    return (
        <Box sx={{p:2}}>
            {revertMessage}
            {deviceConfig}
            <Box sx={{p:2, backgroundColor: theme.palette.primary.light}}>
                <Stack direction="row" spacing={2}>
                    <AddDeviceDialog confirmAction={submitAddDevice} plot={plotConfiguration} devicesToAdd={devicesToAdd} />
                    <Button
                        variant="contained"
                        onClick={onLoadPlotDataClick}
                    >
                        Plot
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}