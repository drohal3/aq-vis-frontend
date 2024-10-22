import {usePlotsConfigurationState} from "../../hooks/usePlotsHook.ts";
import {useDevicesData} from "../../hooks/useDevicesDataHook.ts";
import {useAppDispatch} from "../../hooks/hooks.ts";
import {useAuthData} from "../../hooks/useAuthHook.ts";
import {addPlot, removePlot} from "../../reducers/plotConfigurationsReducer.ts";
import {ChangeEvent, useEffect, useState} from "react";
import deviceService from "../../services/devices.ts";
import {setDevices} from "../../reducers/devicesReducer.ts";
import Plot from "./Plot.tsx";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {Alert} from "@mui/material";
import {timeStringValid} from "../../utils/validators.ts";
import {useUnitsData} from "../../hooks/useUnitsHook.ts";
import unitsService from "../../services/units.ts";
import {setUnits} from "../../reducers/unitsReducer.ts";


function TimeRange({dateTimeFrom, dateTimeTo, dateTimeFromError, dateTimeToError, dateTimeFromChange, dateTimeToChange}:{dateTimeFrom:string, dateTimeTo:string, dateTimeFromChange: (time:string) => void, dateTimeToChange: (time:string) => void, dateTimeFromError:boolean, dateTimeToError:boolean}) {
    return (
        <Grid container spacing={2} sx={{mt:1}}>
            <Grid item md={4}>
                <TextField
                    error={dateTimeFromError}
                    helperText={dateTimeFromError && "Incorrect or missing entry."}
                    fullWidth
                    label="From"
                    variant="standard"
                    placeholder="yyyy-mm-dd hh:mm:ss"
                    value={dateTimeFrom}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => dateTimeFromChange(event.target.value)}
                />
            </Grid>
            <Grid item md={4}>
                <TextField
                    error={dateTimeToError}
                    helperText={dateTimeToError && "Incorrect or missing entry."}
                    fullWidth
                    label="To"
                    variant="standard"
                    placeholder="yyyy-mm-dd hh:mm:ss"
                    value={dateTimeTo}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => dateTimeToChange(event.target.value)}
                />
            </Grid>
        </Grid>
    )
}

function Plots() {
    const dispatch = useAppDispatch()
    const [dateTimeFrom, setDateTimeFrom] = useState("")
    const [dateTimeTo, setDateTimeTo] = useState("")

    const auth = useAuthData()
    const plotConfiguration = usePlotsConfigurationState()
    const devices = useDevicesData()
    const units = useUnitsData()

//  use effect
    useEffect(() => {
        const loadDevices = async () => {
            const devices = await deviceService.get(auth)
            dispatch(setDevices(devices))
            console.log("loaded devices", devices)

        }

        if (devices.length === 0) {
            loadDevices()
        } else {
            console.log("devices already loaded", devices)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        if (units.length === 0) {
            const loadUnits = async() => {
                const loadedUnits = await unitsService.get()
                console.log(loadedUnits)
                dispatch(setUnits(loadedUnits))
            }

            loadUnits()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

//  actions
    const addPlotClick = () => {
        dispatch(addPlot())
    }

    const removePlotClick = (plotId: string) => {
        dispatch(removePlot(plotId))
    }

    const plots = plotConfiguration && plotConfiguration.length > 0 ? plotConfiguration.map(plot => (
        <Box key={plot.id} sx={{my: 1}}>
            <Plot
                plotConfiguration={plot}
                onRemoveClick={() => removePlotClick(plot.id)}
                devices={devices}
                units={units}
                dateTimeFrom={dateTimeFrom}
                dateTimeTo={dateTimeTo}/>
        </Box>
    )) : (
        <Alert
            severity="info"
        >No plot added!</Alert>
    )

    const actions = (
        <Button
            fullWidth
            onClick={addPlotClick}
            disableElevation
            variant="outlined"
            startIcon={<AddIcon />}
        >
            Add Plot
        </Button>
    )
    return (
        <>
            <TimeRange
                dateTimeFrom={dateTimeFrom}
                dateTimeTo={dateTimeTo}
                dateTimeFromError={!timeStringValid(dateTimeFrom)}
                dateTimeToError={!timeStringValid(dateTimeTo)}
                dateTimeFromChange={(time: string) => setDateTimeFrom(time)}
                dateTimeToChange={(time: string) => setDateTimeTo(time)}
            />
            <Divider sx={{my:2}}/>
            {plots}
            <Divider sx={{my:2}}/>
            {actions}
        </>
    )
}

export default Plots