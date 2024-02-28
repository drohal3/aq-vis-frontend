import {useEffect, useState} from "react";
import {useAuthData} from "../hooks/useAuthHook";
import AppLayout from "../components/AppLayout.jsx";
import Typography from "@mui/material/Typography";

import measurementsService from "../services/measurements"

import PlotForm from "../components/measurements/PlotForm.jsx";
import Divider from '@mui/material/Divider';
import Box from "@mui/material/Box";


function Measurements(){
  const auth = useAuthData()
  const [devices, setDevices] = useState([])

  useEffect( () => {
    const loadMeasurements = async () => await measurementsService.get(0, auth?.token)
    // loadMeasurements()
  }, []);


  return (
    <>
      <AppLayout>
        <Box sx={{m:1}}>
          <Typography variant="h4" gutterBottom>
            Measurements
          </Typography>
          <Divider />
        </Box>

        <PlotForm devices={devices} setDevices={setDevices}/>


      </AppLayout>
      {/*{devices.map((device, key) => (<p key={key}>{device.name}</p>))}*/}
    </>
  )
}

export default Measurements