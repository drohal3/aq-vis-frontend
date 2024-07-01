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


function TimeRange({dateTimeFrom, dateTimeTo, dateTimeFromChange, dateTimeToChange}:{dateTimeFrom:string, dateTimeTo:string, dateTimeFromChange: (time:string) => void, dateTimeToChange: (time:string) => void}) {
    return (
        <Grid container spacing={2} sx={{marginTop:1}}>
            <Grid item md={4}>
                <TextField
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
    console.log("plots - auth data", auth)
    console.log("plots - plotConfiguration data", plotConfiguration)
    console.log("plots - devices data", devices)


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

//  actions
    const addPlotClick = () => {
        dispatch(addPlot())
    }

    const removePlotClick = (plotId: string) => {
        dispatch(removePlot(plotId))
    }

    const plots = plotConfiguration.map(plot => (
        <Box key={plot.id} sx={{marginTop: 1, marginBottom: 1}}>
            <Plot
                plotConfiguration={plot}
                onRemoveClick={() => removePlotClick(plot.id)}
                devices={devices}
                dateTimeFrom={dateTimeFrom}
                dateTimeTo={dateTimeTo}/>
        </Box>
    ))

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
            <TimeRange dateTimeFrom={dateTimeFrom} dateTimeTo={dateTimeTo} dateTimeFromChange={(time: string) => setDateTimeFrom(time)} dateTimeToChange={(time: string) => setDateTimeTo(time)} />
            <Divider sx={{marginTop:2, marginBottom:2}}/>
            {plots}
            <Divider sx={{marginTop:2, marginBottom:2}}/>
            {actions}
        </>
    )
}

export default Plots