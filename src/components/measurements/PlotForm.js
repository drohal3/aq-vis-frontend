import {FormGroup, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";

import {useMeasurementData} from "../../hooks/usePlotConfigurationDataHook";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PlotFormAddDevice from "./PlotFormAddDevice";
import PlotFormDeviceOptions from "./PlotFormDeviceOptions";
import {useDevicesData} from "../../hooks/useDevicesDataHook";

export default function PlotForm() {
  const [form_hidden, set_form_hidden] = useState(true)

  const devicesToPlotData = useMeasurementData()
  const devicesToPlot = devicesToPlotData?.devices_to_plot
  const devices = useDevicesData()

  let plotConfiguration = []

  devicesToPlot.forEach((deviceToPlot) => {
    for (let index = 0; index < devices.length; index++) {
      const device = devices[index]

      if (device.deviceId === deviceToPlot.deviceId) {
        console.log(deviceToPlot)
        const selectedValues = deviceToPlot.values
        plotConfiguration.push({...device, selectedValues })
        break
      }
    }


  })

  return (
    <>
      <Box hidden={!form_hidden}>
        <Button variant="contained" startIcon={<AddIcon/>} onClick={() => set_form_hidden(false)}>
          Add Device
        </Button>
      </Box>

      <Box hidden={form_hidden}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <PlotFormAddDevice
              afterCancelClick={() => set_form_hidden(true)}
              afterConfirmClick={() => set_form_hidden(true)}
              devices = {devices}
            />
          </Grid>
        </Grid>
      </Box>
      <PlotFormDeviceOptions plotConfiguration={plotConfiguration} />
    </>
  )
}