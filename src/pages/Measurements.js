import deviceService from '../services/devices'
import {useEffect, useState} from "react";
import {useAuthData} from "../hooks/useAuthHooks";
import NavBar from "../components/Nav"
import Chart from "../components/Chart";
import AppLayout from "../components/AppLayout";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const devices = ["iaq1", "iaq2,", "iaq3", "am1"]


function Measurements(){

  return (
    <>
      <AppLayout>
        <Typography variant="h4" gutterBottom>
          Measurements
        </Typography>
      </AppLayout>
      {/*{devices.map((device, key) => (<p key={key}>{device.name}</p>))}*/}
    </>
  )
}

export default Measurements