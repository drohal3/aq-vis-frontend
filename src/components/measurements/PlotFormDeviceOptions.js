import Typography from "@mui/material/Typography";

function PlotFormDeviceOption({device}) {
  return (
    <Typography>
      {device.name}
    </Typography>
  )
}

export default function PlotFormDeviceOptions({plotConfiguration}) {
  console.log("merged devicesToPlot", plotConfiguration)

  return (
    <>
      {plotConfiguration.map((deviceToPlot) => (
        <PlotFormDeviceOption key={deviceToPlot.deviceId} device={deviceToPlot} />
      ))}
    </>
  )
}