import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import deviceService from "../../services/devices"
import {useAuthData} from "../../hooks/useAuthHook";
import {Stack} from "@mui/material";
import Divider from '@mui/material/Divider';
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {useDispatch} from "react-redux";
import {useUnitsData} from "../../hooks/useUnitsHook";
import unitsService from "../../services/units"
import {setUnits} from "../../reducers/unitsReducer";



function AddParameterForm(params){
  const {onConfirmClick, onCancelClick} = params

  const dispatch = useDispatch()
  const units = useUnitsData()

  const [unit, setUnit] = useState("")
  const [name, setName] = useState("")
  const [code, setCode] = useState("")

  useEffect(() => {
    if (units.length === 0) {
      const loadUnits = async() => {
        const loadedUnits = await unitsService.get()
        console.log(loadedUnits)
        dispatch(setUnits(loadedUnits))
      }

      loadUnits()
    }
  }, []);


  const resetForm = () => {
    setName("")
    setCode("")
    setUnit("")
  }

  const confirmClick = () => {
    onConfirmClick({name, code, unit})
    resetForm()
  }

  const cancelClick = () => {
    onCancelClick()
    resetForm()
  }

  return (
    <>
      <Typography>
        Add Parameter
      </Typography>
      <Stack spacing={2}>
        <TextField id="filled-basic" value={name} onChange={(event) => setName(event.target.value)} label="Parameter Name" variant="filled" />
        <TextField id="filled-basic" value={code} onChange={(event) => {setCode(event.target.value)}} label="Parameter Code" variant="filled" />
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label">Unit</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={unit}
            onChange={(event) => setUnit(event.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {units.map(unit => (
              <MenuItem key={unit.id} value={unit.id}>{unit.symbol} - {unit.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Box sx={{p: 1}}>
        <Stack direction="row"
          // justifyContent="space-between"
               alignItems="space-between"
               spacing={2}>
          <IconButton aria-label="confirm" size="large" onClick={confirmClick}>
            <CheckIcon fontSize="inherit" />
          </IconButton>
          <IconButton aria-label="cancel" size="large" onClick={cancelClick}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      </Box>
    </>
  )
}

function NewDeviceForm(params){
  const {onConfirmClick, onCancelClick} = params

  const [name, setDeviceName] = useState("")
  const [code, setDeviceCode] = useState("")
  const [parameters, setDeviceParameters] = useState([])

  const [parameterFormHidden, setParameterFormHidden] = useState(true)

  const dispatch = useDispatch()
  const units = useUnitsData()

  useEffect(() => {
    if (units.length === 0) {
      const loadUnits = async() => {
        const loadedUnits = await unitsService.get()
        console.log(loadedUnits)
        dispatch(setUnits(loadedUnits))
      }

      loadUnits()
    }
  }, []);

  const auth = useAuthData()

  const resetForm = () => {
    setDeviceName("")
    setDeviceCode("")
    setDeviceParameters([])
  }

  const handleConfirmClick = async () => {
    console.log("handle click")
    const data = {
      name, code, "organisation": auth.organisation, parameters
    }

    console.log("create device", data)
    const response = await deviceService.create(auth, data)
    console.log(response)

    resetForm()
  }

  const handleCancelClick = async () => {
    console.log("Cancel click")
    resetForm()
  }

  const addParameter = (parameter) => {
    setDeviceParameters([...parameters, parameter])
    setParameterFormHidden(true)
    console.log("added", parameter)
  }

  const deleteParameter = (parameterCode) => {
    const nparameters = parameters.filter(parameter => parameter.code !== parameterCode)
    setDeviceParameters(nparameters)
  }

  const findUnitSymbolById = (unitId) => {
    console.log("looking for unit", unitId)
    console.log("looking in", units)
    const unit = units.find(unit => unit.id === unitId)
    return unit?.symbol ?? "unknown"
  }

  return (
    <Stack spacing={2}>
      <TextField id="device-name" label="Device Name" variant="filled" value={name}
                 onChange={(event) => setDeviceName(event.target.value)} />
      <TextField id="device-code" label="Device Code" variant="filled" value={code}
                 onChange={(event) => setDeviceCode(event.target.value)}/>

      <Stack direction="row"
             justifyContent="flex-start"
             alignItems="center"
             spacing={1}
             flexWrap="wrap"
             useFlexGap>
        <Typography>
          Parameters:
        </Typography>
        {parameters.map(parameter => (
          <Chip
            key={parameter.code}
            label={`${parameter.code} - ${parameter.name} [${findUnitSymbolById(parameter.unit)}]`}
            onClick={() => console.log("Handle click")}
            onDelete={() => deleteParameter(parameter.code)}
          />
        ))}
      </Stack>
      <Box hidden={!parameterFormHidden}>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => {setParameterFormHidden(false)}}>
          Add parameter
        </Button>
      </Box>
      <Box hidden={parameterFormHidden} sx={{ border: '1px dashed #e3dbdb', p: 1 }}>
        <AddParameterForm onConfirmClick={addParameter} onCancelClick={() => setParameterFormHidden(true)}/>
      </Box>
      <Divider />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="space-between"
        spacing={2}
      >
        <Button variant="contained" onClick={handleConfirmClick}>Confirm</Button>
        <Button variant="text" onClick={handleCancelClick}>Cancel</Button>
      </Stack>
    </Stack>
  )
}

export default NewDeviceForm
