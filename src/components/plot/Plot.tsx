import {
    addDeviceToPlot,
    PlotToPlotState,
} from "../../reducers/plotConfigurationsReducer.ts";
import {addLoadedPlotDeviceData} from "../../reducers/plotDataReducer.ts";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {DeviceData} from "../../reducers/devicesReducer.ts";
import Box from "@mui/material/Box";
import {useAppDispatch} from "../../hooks/hooks.ts";
import {
    Alert,
    Divider,
    Stack
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TuneIcon from '@mui/icons-material/Tune';
import { useTheme } from '@mui/material/styles';
import {useState} from "react";
import {useAuthData} from "../../hooks/useAuthHook.ts";
import measurementService from "../../services/measurements.ts"
import {Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {usePlotData} from "../../hooks/usePlotDataHook.ts";
import {AddDeviceDialog, DeviceConfiguration} from "./PlotConfiguration.tsx";

/* TODO:
*
*  Plot
*   - PlotConfiguration
*       - PlotConfigurationDevice
*   - PlotChart
*
* */


/* TODO:
*  PlotConfigurations
*   - current state
*   - loaded
*
*  LoadedPlotData
*
* */


interface PlotProps {
    plot: PlotToPlotState,
    devices: Array<DeviceData>,
    onRemoveClick: (plotId: string) => void,
    dateTimeFrom: string,
    dateTimeTo: string
}

function Plot(props: PlotProps) {
    const {plot, onRemoveClick, devices, dateTimeFrom,dateTimeTo} = props

    console.log("props", props)


    const auth = useAuthData()
    const theme = useTheme()


    const [addDeviceValue, setAddDeviceValue] = useState("")
    const [plotDebug, setPlotDebug] = useState("")

    const dispatch = useAppDispatch()
    const loadedPlotData = usePlotData(plot.id)
    console.log("====> plot", plot)
    const devicesToPlot = plot.current
    const selectedDevices = plot.current.map((device) => device.device)

    const submitAddDevice = (plotId: string, deviceId: string) => {
        dispatch(addDeviceToPlot(plotId, {device: deviceId, parameters: []}))
        setAddDeviceValue("")
    }

    // const clickRemoveDevice = (plotId: string, deviceId: string) => {
    //     dispatch(removeDeviceFromPlot(plotId, deviceId))
    // }

    const deviceById = (deviceId: string) => {
        return devices.find((device) => device.id == deviceId)
    }

    const loadedPlotDataDebug = loadedPlotData ? JSON.stringify(loadedPlotData) : "Not loaded."

    const loadPlotData = async () => {
        setPlotDebug(JSON.stringify(plot))
        for (const deviceToPlot of devicesToPlot) {
            const deviceId = deviceById(deviceToPlot.device)?.code ?? ""
            const parameters = deviceToPlot.parameters.map((parameter) => parameter.parameter ?? "")
            const loadedData = await measurementService.get(deviceId, parameters, dateTimeFrom, dateTimeTo, auth)
            dispatch(addLoadedPlotDeviceData(plot.id, deviceId, loadedData))
        }
        // const loadedData = measurementService.get("0", dateTimeFrom, dateTimeTo, auth)
    }

    const deviceConfig = plot.current && plot.current?.length > 0 ? plot.current?.map((device) => (
        <Box key={device.device}>
            <DeviceConfiguration device={deviceById(device.device)} plot={plot} />
        </Box>
    )) : (<Alert severity="info">No device added!</Alert>)



    const exampleDataA = [
        {sample_date_time: '2024-05-01T00:00:00Z', device_id: 0, condenser_temperature: 21.304043636675573},
        {sample_date_time: '2024-05-01T00:00:01Z', device_id: 0, condenser_temperature: 21.304043636675573},
        {sample_date_time: '2024-05-01T00:00:02Z', device_id: 0, condenser_temperature: 21.304043636675573},
        {sample_date_time: '2024-05-01T00:00:03Z', device_id: 0, condenser_temperature: 21.304043636675573},
        {sample_date_time: '2024-05-01T00:00:04Z', device_id: 0, condenser_temperature: 21.304043636675573},
        {sample_date_time: '2024-05-01T00:00:05Z', device_id: 0, condenser_temperature: 21.304043636675573},
        {sample_date_time: '2024-05-01T00:00:06Z', device_id: 0, condenser_temperature: 21.304043636675573},
        {sample_date_time: '2024-05-01T00:00:07Z', device_id: 0, condenser_temperature: 21.304043636675573},
        {sample_date_time: '2024-05-01T00:00:08Z', device_id: 0, condenser_temperature: 21.304043636675573},
        {sample_date_time: '2024-05-01T00:00:09Z', device_id: 0, condenser_temperature: 21.304043636675573}
    ]

    const exampleDataB = [
        {sample_date_time: '2024-05-01T00:00:00Z', device_id: 0, condenser_temperature: 23.304043636675573},
        {sample_date_time: '2024-05-01T00:00:01Z', device_id: 0, condenser_temperature: 24.304043636675573},
        {sample_date_time: '2024-05-01T00:00:02Z', device_id: 0, condenser_temperature: 25.304043636675573},
        {sample_date_time: '2024-05-01T00:00:03Z', device_id: 0, condenser_temperature: 26.304043636675573},
        {sample_date_time: '2024-05-01T00:00:04Z', device_id: 0, condenser_temperature: 27.304043636675573},
        {sample_date_time: '2024-05-01T00:00:05Z', device_id: 0, condenser_temperature: 28.304043636675573},
        {sample_date_time: '2024-05-01T00:00:06Z', device_id: 0, condenser_temperature: 29.304043636675573},
        {sample_date_time: '2024-05-01T00:00:07Z', device_id: 0, condenser_temperature: 28.304043636675573},
        {sample_date_time: '2024-05-01T00:00:08Z', device_id: 0, condenser_temperature: 27.304043636675573},
        {sample_date_time: '2024-05-01T00:00:09Z', device_id: 0, condenser_temperature: 26.304043636675573}
    ]

    const exampleDataC = [
        {sample_date_time: '2024-05-01T00:00:00Z', device_id: 0, saturator_temperature: 23.304043636675573},
        {sample_date_time: '2024-05-01T00:00:01Z', device_id: 0, saturator_temperature: 22.304043636675573},
        {sample_date_time: '2024-05-01T00:00:02Z', device_id: 0, saturator_temperature: 21.304043636675573},
        {sample_date_time: '2024-05-01T00:00:03Z', device_id: 0, saturator_temperature: 20.304043636675573},
        {sample_date_time: '2024-05-01T00:00:04Z', device_id: 0, saturator_temperature: 19.304043636675573},
        {sample_date_time: '2024-05-01T00:00:05Z', device_id: 0, saturator_temperature: 18.304043636675573},
        {sample_date_time: '2024-05-01T00:00:06Z', device_id: 0, saturator_temperature: 17.304043636675573},
        {sample_date_time: '2024-05-01T00:00:07Z', device_id: 0, saturator_temperature: 18.304043636675573},
        {sample_date_time: '2024-05-01T00:00:08Z', device_id: 0, saturator_temperature: 20.304043636675573},
        {sample_date_time: '2024-05-01T00:00:09Z', device_id: 0, saturator_temperature: 18.304043636675573}
    ]

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
                <Stack direction="row" spacing={2}>
                    <AddDeviceDialog confirmAction={submitAddDevice} plot={plot} devicesToAdd={devices.filter((device) => !selectedDevices.includes(device.id ? device.id : ""))} />
                    <Button
                        variant="contained"
                        onClick={loadPlotData}
                    >
                        Plot
                    </Button>
                </Stack>
            </Box>
            <Box sx={{p:10}}>
                <Typography variant="h1">Plot will be here!</Typography>
                <Box sx={{backgroundColor: "yellow"}}>
                    <Typography>Debug: </Typography>
                    {loadedPlotDataDebug}
                </Box>

                <Typography>{plotDebug}</Typography>

                <ResponsiveContainer width='100%' aspect={4.0/1.5}>
                    <LineChart
                        width={1000}
                        height={500}
                    >
                        <XAxis dataKey="sample_date_time" allowDuplicatedCategory={false} />
                        <YAxis type="number" />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            data={exampleDataA}
                            dataKey="condenser_temperature"
                            name="particle concentration #/cm3"
                            stroke="#20BFC3"
                            strokeWidth={2}
                            activeDot={{ r: 5 }}
                            dot={false}
                        />
                        <Line
                            type="monotone"
                            data={exampleDataB}
                            dataKey="condenser_temperature"
                            name="particle concentration #/cm3"
                            stroke="#20BFFF"
                            strokeWidth={2}
                            activeDot={{ r: 5 }}
                            dot={false}
                        />
                        <Line
                            type="monotone"
                            data={exampleDataC}
                            dataKey="saturator_temperature"
                            name="particle concentration #/cm3"
                            stroke="#EF0F00"
                            strokeWidth={2}
                            activeDot={{ r: 5 }}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>

            </Box>
        </Box>
    )
}

export default Plot