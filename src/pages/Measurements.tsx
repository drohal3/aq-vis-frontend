import {useState} from "react";
// import {useAuthData} from "../hooks/useAuthHook";
import deviceService from "../services/devices"
import AppLayout from "../components/AppLayout.tsx";
import Typography from "@mui/material/Typography";

// import measurementsService from "../services/measurements"

// import PlotForm from "../components/measurements/PlotForm.tsx";
import Divider from '@mui/material/Divider';
import Box from "@mui/material/Box";
import {useEffect} from "react";
import {setDevices} from "../reducers/devicesReducer.ts";
import {useAuthData} from "../hooks/useAuthHook.ts";
import {usePlotsData} from "../hooks/usePlotsHook.ts";
import {useAppDispatch} from "../hooks/hooks.ts";
import {useDevicesData} from "../hooks/useDevicesDataHook.ts";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import {v4 as uuidv4} from 'uuid';
import {addPlot, removePlot, addDeviceToPlot} from "../reducers/plotsReducer";
import Plot from "../components/plot/Plot.tsx";
import {Block} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

function Measurements(){
  const dispatch = useAppDispatch()
  const devices = useDevicesData()
  const auth = useAuthData()
  const plotsData = usePlotsData()
  console.log("plots data", plotsData)

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
    <>
      <AppLayout>
        <Box sx={{m:1}}>
          <Typography variant="h4" gutterBottom>
            Measurements
          </Typography>
          <Divider />
        </Box>
        <Grid container spacing={2} sx={{m:1}}>
          <Grid item md={4}>
            <TextField
                fullWidth
                label="From"
                variant="standard"
                placeholder="yyyy-mm-dd hh:mm:ss"
            />
          </Grid>
          <Grid item md={4}>
            <TextField
                fullWidth
                label="To"
                variant="standard"
                placeholder="yyyy-mm-dd hh:mm:ss"
            />
          </Grid>
        </Grid>
        <Divider sx={{m:2}}/>

        {plotsData.map((plot) => (
            <div key={plot.id}>
              <Plot key={plot.id} plot={plot} onRemoveClick={() => removePlotClick(plot.id)} devices={devices} />
              <Divider sx={{marginTop:2, marginBottom:2}}/>
            </div>
        ))}

        <Button
            fullWidth
            onClick={addPlotClick}
            disableElevation
            variant="outlined"
            startIcon={<AddIcon />}
        >Add Plot</Button>

      </AppLayout>
      {/*{devices.map((device, key) => (<p key={key}>{device.name}</p>))}*/}
    </>
  )
}

export default Measurements