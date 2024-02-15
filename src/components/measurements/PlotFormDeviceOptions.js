import Typography from "@mui/material/Typography";
import MultipleSelectChip from "../form/MultipleSelectChip";

function PlotFormDeviceOption({device}) {
  console.log("deviceee", device)
  const deviceValuesOptions = device.values.map((option) => {
    return {
      name: option.name,
      code: option.code
    }
  })

  // const deviceValuesOptions = [
  //   {name: "some name", code: "coode"}
  // ]

  const selectedDeviceValuesOptions = device.selectedValues

  console.log("values", deviceValuesOptions)
  console.log("selected values", selectedDeviceValuesOptions)

  // const selectedDeviceValuesOptions = ["coode"]

  return (
    <>
      <Typography>
        {device.name}
      </Typography>
      <MultipleSelectChip
        title="Values to plot"
        setOnChange={(value) => console.log(value)}
        options={deviceValuesOptions}
        selectedOptions={selectedDeviceValuesOptions}
      />
    </>
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