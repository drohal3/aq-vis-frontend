import {
    confirmPlotToPlot,
    PlotConfigurationState,
} from "../../reducers/plotConfigurationsReducer.ts";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {DeviceData} from "../../reducers/devicesReducer.ts";
import Box from "@mui/material/Box";
import {
    Divider,
    Stack
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TuneIcon from '@mui/icons-material/Tune';
import { useTheme } from '@mui/material/styles';
import {useState} from "react";
import {Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {usePlotData} from "../../hooks/usePlotDataHook.ts";
import PlotConfiguration from "./PlotConfiguration.tsx";
import measurementService from "../../services/measurements.ts";
import {addLoadedPlotDeviceData} from "../../reducers/plotDataReducer.ts";
import {useAppDispatch} from "../../hooks/hooks.ts";
import {useAuthData} from "../../hooks/useAuthHook.ts";
import {timeStringValid} from "../../utils/validators.ts";
import {addNotification} from "../../utils/notifications.ts";

interface PlotProps {
    plotConfiguration: PlotConfigurationState,
    devices: Array<DeviceData>,
    onRemoveClick: (plotId: string) => void,
    dateTimeFrom: string,
    dateTimeTo: string
}

function Plot(props: PlotProps) {
    const {plotConfiguration, onRemoveClick, devices, dateTimeFrom,dateTimeTo} = props
    const dispatch = useAppDispatch()
    const auth = useAuthData()
    const theme = useTheme()
    const [configurationOpen, setConfigurationOpen] = useState(true)


    const loadedPlotData = usePlotData(plotConfiguration.id)

    let errorMessage = null
    const dateTimeFromValid = timeStringValid(dateTimeFrom)
    const dateTimeToValid = timeStringValid(dateTimeTo)

    if (!dateTimeFromValid || !dateTimeToValid) {
        errorMessage = "Invalid time range!"
    } else {
        const timeRange = (dateTimeToValid.getTime() - dateTimeFromValid.getTime())/1000
        if (timeRange < 0) {
            errorMessage = "Time \"To\" must be after Time \"From\""
        }

        if (timeRange > 60 * 15) {
            errorMessage = "Cannot query more than 15 minutes of data!"
        }
    }

    let found = false
    for (const deviceToPlot of plotConfiguration.current) {
        const parameters = deviceToPlot.parameters
        if (parameters.length > 0) {
            found = true
            break
        }
    }

    if (!found) {
        errorMessage = "No parameters to Plot!"
    }

    const loadPlotData = async (dateTimeFrom: string, dateTimeTo: string) => {
        try {
            for (const deviceToPlot of plotConfiguration.current) {
                const parameters = deviceToPlot.parameters.map((parameter) => parameter.parameter ?? "")
                const loadedData = await measurementService.get(deviceToPlot.deviceCode, parameters, dateTimeFrom, dateTimeTo, auth)
                dispatch(addLoadedPlotDeviceData(plotConfiguration.id, deviceToPlot.deviceCode, loadedData))
                setConfigurationOpen(false)
            }
            dispatch(confirmPlotToPlot(plotConfiguration.id))
        } catch (e) {
            addNotification(dispatch, "Something went wrong!", "error", 2000)
        }

    }

    interface ParameterLine {
        color:string,
        parameter:string,
        dataIndex:number
    }

    const plotLinesData = plotConfiguration.loaded.reduce((acc, cur) => {
        const deviceCode = cur.deviceCode
        if (loadedPlotData == undefined) {
            return acc
        }
        const loadedDataIndex = loadedPlotData.deviceData.findIndex(d => d.deviceCode == deviceCode)

        if (loadedDataIndex == undefined) {
            return acc
        }

        const parameterLines = cur.parameters.map((parameter) => {
            if (parameter.parameter == undefined) {
                return
            }
            return {
                color:parameter.hexColor,
                parameter:parameter.parameter,
                dataIndex:loadedDataIndex
            }
        })

        return [...acc, ...parameterLines]

    }, Array<ParameterLine|undefined>()).filter(p=>p != undefined)


    const plotConfigurationBlock = configurationOpen && (
            <Box sx={{backgroundColor: theme.palette.primary.light}}>
                <PlotConfiguration
                    plotConfiguration={plotConfiguration}
                    devices={devices}
                    loadData={loadPlotData}
                    dateTimeFrom={dateTimeFrom}
                    dateTimeTo={dateTimeTo}
                    errorMessage={errorMessage}
                />
            </Box>
    )


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
                        Plot #{plotConfiguration.id}
                    </Typography>
                    <Button
                        startIcon={<TuneIcon/>}
                        variant="contained"
                        disableElevation
                        onClick={() => setConfigurationOpen(!configurationOpen)}
                    >
                        Configure plot
                    </Button>
                </Stack>

                <Button
                    onClick={() => onRemoveClick(plotConfiguration.id)}
                    startIcon={<DeleteIcon />}
                    variant="contained"
                    disableElevation
                >
                    Remove plot
                </Button>
            </Stack>

            {plotConfigurationBlock}

            <Box sx={{p:10}}>
                <ResponsiveContainer width='100%' aspect={4.0/1.5}>
                    <LineChart
                        width={1000}
                        height={500}
                    >
                        <XAxis dataKey="sample_date_time" allowDuplicatedCategory={false} />
                        <YAxis type="number" />
                        <Tooltip />
                        <Legend />
                        {
                            plotLinesData.map((line)=>line && (
                                <Line
                                    key={line.parameter}
                                    type="monotone"
                                    data={loadedPlotData?.deviceData[0].data}
                                    dataKey={line.parameter}
                                    name={line.parameter}
                                    stroke={line.color}
                                    strokeWidth={2}
                                    activeDot={{ r: 5 }}
                                    dot={false}
                                />
                            ))
                        }
                    </LineChart>
                </ResponsiveContainer>

            </Box>
        </Box>
    )
}

export default Plot