import Typography from "@mui/material/Typography";
import MultipleSelectChip from "../form/MultipleSelectChip.jsx";
import {setMeasurementValues, removeMeasurementDevice} from "../../reducers/plotConfigurationReducer";
import {useDispatch} from "react-redux";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';


function PlotFormDeviceOption({device}) {
  const dispatch = useDispatch();

  const deviceValuesOptions = device.parameters.map((option) => {
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
    dispatch(setMeasurementValues(device.code, value))
  }

  const handleDeleteButtonClick = () => {
    dispatch(removeMeasurementDevice(device.code))
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
      <IconButton aria-label="delete" size="large" onClick={handleDeleteButtonClick}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </>
  )
}

export default function PlotFormDeviceOptions({plotConfiguration}) {
  return (
    <>
      {plotConfiguration.map((deviceToPlot) => (
        <PlotFormDeviceOption key={deviceToPlot.code} device={deviceToPlot} />
      ))}
    </>
  )
}