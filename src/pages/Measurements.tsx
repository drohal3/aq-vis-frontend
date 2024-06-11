import {ChangeEvent, useState} from "react";
// import {useAuthData} from "../hooks/useAuthHook";
import deviceService from "../services/devices"
import AppLayout from "../components/AppLayout.tsx";

// import measurementsService from "../services/measurements"

// import PlotForm from "../components/measurements/PlotForm.tsx";
import Divider from '@mui/material/Divider';
import {useEffect} from "react";
import {setDevices} from "../reducers/devicesReducer.ts";
import {useAuthData} from "../hooks/useAuthHook.ts";
import {usePlotsConfigurationState} from "../hooks/usePlotsHook.ts";
import {useAppDispatch} from "../hooks/hooks.ts";
import {useDevicesData} from "../hooks/useDevicesDataHook.ts";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import {v4 as uuidv4} from 'uuid';
import {addPlot, removePlot} from "../reducers/plotConfigurationsReducer.ts";
import Plot from "../components/plot/Plot.tsx";
import AddIcon from "@mui/icons-material/Add";

function Measurements(){
  const [dateTimeFrom, setDateTimeFrom] = useState("")
  const [dateTimeTo, setDateTimeTo] = useState("")
  const dispatch = useAppDispatch()
  const devices = useDevicesData()
  const auth = useAuthData()
  const plotConfiguration = usePlotsConfigurationState()
  console.log("plots data", plotConfiguration)

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

  const addPlotClick = () => {
    let plot_id = uuidv4()
    dispatch(addPlot())
    console.log(plot_id)
  }

  const removePlotClick = (plotId: string) => {
    dispatch(removePlot(plotId))
  }

  return (
    <AppLayout title="Measurements">
      <Grid container spacing={2} sx={{marginTop:1}}>
        <Grid item md={4}>
          <TextField
              fullWidth
              label="From"
              variant="standard"
              placeholder="yyyy-mm-dd hh:mm:ss"
              value={dateTimeFrom}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setDateTimeFrom(event.target.value)}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
              fullWidth
              label="To"
              variant="standard"
              placeholder="yyyy-mm-dd hh:mm:ss"
              value={dateTimeTo}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setDateTimeTo(event.target.value)}
          />
        </Grid>
      </Grid>
      <Divider sx={{m:2}}/>

      {plotConfiguration.map((plot) => (
          <div key={plot.id}>
            <Plot
                key={plot.id}
                plotConfiguration={plot}
                onRemoveClick={() => removePlotClick(plot.id)}
                devices={devices}
                dateTimeFrom={dateTimeFrom}
                dateTimeTo={dateTimeTo}/>
            <Divider sx={{marginTop:2, marginBottom:2}}/>
          </div>
      ))}

      <Button
          fullWidth
          onClick={addPlotClick}
          disableElevation
          variant="outlined"
          startIcon={<AddIcon />}
      >
        Add Plot
      </Button>
    </AppLayout>
  )
}

export default Measurements