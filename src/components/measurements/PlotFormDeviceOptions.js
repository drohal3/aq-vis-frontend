import Typography from "@mui/material/Typography";
import MultipleSelectChip from "../form/MultipleSelectChip";
import {setMeasurementValues} from "../../reducers/plotConfigurationReducer";
import {useDispatch} from "react-redux";

function PlotFormDeviceOption({device}) {
  const dispatch = useDispatch();

  const deviceValuesOptions = device.values.map((option) => {
    return {
      label: option.name,
      code: option.code
    }
  })

  // const deviceValuesOptions = [
  //   {name: "some name", code: "coode"}
  // ]

  const selectedDeviceValuesOptions = device.selectedValues

  // const selectedDeviceValuesOptions = ["coode"]
  const handleSetOnChange = (value) => {
    dispatch(setMeasurementValues(device.deviceId, value))
  }

  return (
    <>
      <Typography>
        {device.name}
      </Typography>
      <MultipleSelectChip
        title="Values to plot"
        setOnChange={handleSetOnChange}
        options={deviceValuesOptions}
        selectedOptions={selectedDeviceValuesOptions}
      />
    </>
  )
}

export default function PlotFormDeviceOptions({plotConfiguration}) {
  return (
    <>
      {plotConfiguration.map((deviceToPlot) => (
        <PlotFormDeviceOption key={deviceToPlot.deviceId} device={deviceToPlot} />
      ))}
    </>
  )
}