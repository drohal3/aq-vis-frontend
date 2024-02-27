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

  const devicesToPlot = useMeasurementData()
  const devices = useDevicesData()

  let plotConfiguration = []

  let mappedDevicesToPlotCodes = []
  devicesToPlot.forEach((deviceToPlot) => {
    mappedDevicesToPlotCodes.push(deviceToPlot.code)
    for (let index = 0; index < devices.length; index++) {
      const device = devices[index]

      if (device.code === deviceToPlot.code) {
        console.log(deviceToPlot)
        const selectedValues = deviceToPlot.parameters
        plotConfiguration.push({...device, selectedValues })
        break
      }
    }
  })

  const devicesToAdd = devices.reduce((acc, cur) => {
    if (mappedDevicesToPlotCodes.indexOf(cur.code) === -1) {
      return [...acc, cur]
    }

    return acc
  }, [])

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
              devices = {devicesToAdd}
            />
          </Grid>
        </Grid>
      </Box>
      <PlotFormDeviceOptions plotConfiguration={plotConfiguration} />
    </>
  )
}