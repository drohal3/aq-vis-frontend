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
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {ButtonGroup, Stack} from "@mui/material";
import {v4 as uuidv4} from 'uuid';
import {addPlot, removePlot, addDeviceToPlot} from "../reducers/plotsReducer";
import Plot from "../components/plot/Plot.tsx";


function SelectAutoWidth() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
      <div>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
          <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={age}
              onChange={handleChange}
              autoWidth
              label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Twenty</MenuItem>
            <MenuItem value={21}>Twenty one</MenuItem>
            <MenuItem value={22}>Twenty one and a half</MenuItem>
          </Select>
        </FormControl>
      </div>
  );
}

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

        <Button onClick={addPlotClick} disableElevation variant="contained">Add Plot</Button>

        {plotsData.map((plot) => (
            <Plot key={plot.id} plot={plot} onRemoveClick={() => removePlotClick(plot.id)} devices={devices} />
        ))}


      </AppLayout>
      {/*{devices.map((device, key) => (<p key={key}>{device.name}</p>))}*/}
    </>
  )
}

export default Measurements