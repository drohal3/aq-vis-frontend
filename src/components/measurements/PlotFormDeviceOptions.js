import Typography from "@mui/material/Typography";

function PlotFormDeviceOption({device}) {
  return (
    <Typography>
      {device.name}
    </Typography>
  )
}

export default function PlotFormDeviceOptions({devicesToPlot}) {
  console.log("merged devicesToPlot", devicesToPlot)

  return (
    <>
      {devicesToPlot.map((deviceToPlot) => (
        <PlotFormDeviceOption key={deviceToPlot.deviceId} device={deviceToPlot} />
      ))}
    </>
  )
}