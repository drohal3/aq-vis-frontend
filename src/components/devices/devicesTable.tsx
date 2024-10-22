import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import deviceService from "../../services/devices"
import {DeviceData, removeDevice} from "../../reducers/devicesReducer.ts";
import {useAuthData} from "../../hooks/useAuthHook.ts";
import {useAppDispatch} from "../../hooks/hooks.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import unitsService from "../../services/units"
import {useUnitsData} from "../../hooks/useUnitsHook.ts";
import {setUnits} from "../../reducers/unitsReducer.ts";


function Row({ device }: {device: DeviceData}) {
  const units = useUnitsData()
  useEffect(() => {
    if (units.length === 0) {
      const loadUnits = async() => {
        const loadedUnits = await unitsService.get()
        dispatch(setUnits(loadedUnits))
      }

      loadUnits()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch()
  const auth = useAuthData()
  const handleDeleteClick = async (device_id:string) => {
    await deviceService.remove(auth, device_id)
    dispatch(removeDevice(device_id))
  }

  const getUnitName = (code: string) => {
    const unit = units.find((unit) => unit.id === code)
    if (unit && unit.name) {
      return unit.name
    }

    return "unknown"
  }

  const getUnitSymbol = (code: string) => {
    const unit = units.find((unit) => unit.id === code)
    if (unit && unit.symbol) {
      return unit.symbol
    }

    return "unknown"
  }

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {device.name}
        </TableCell>
        <TableCell align="left">{device.code}</TableCell>
        <TableCell align="center">
          <IconButton aria-label="delete" size="medium"
                      onClick={() => navigate(`/devices/${device.id}/update`)}>
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton aria-label="delete" size="medium"
                      onClick={async () => { if (device.id){await handleDeleteClick(device.id)}}}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Parameters
              </Typography>
              <Table size="small" aria-label="purchases" sx={{backgroundColor:"#E8F8F9\n"}}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Code</TableCell>
                    <TableCell align="left">Unit Name</TableCell>
                    <TableCell align="left">Unit Symbol</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {device.parameters.map((parameter) => (
                    <TableRow key={parameter.code}>
                      <TableCell component="th" scope="row">
                        {parameter.name}
                      </TableCell>
                      <TableCell>{parameter.code}</TableCell>
                      <TableCell>{getUnitName(parameter.unit)}</TableCell>
                      <TableCell>{getUnitSymbol(parameter.unit)}</TableCell>
                    </TableRow>
                  ))}
                  {/*{row.history.map((historyRow) => (*/}
                  {/*  <TableRow key={historyRow.date}>*/}
                  {/*    <TableCell component="th" scope="row">*/}
                  {/*      {historyRow.date}*/}
                  {/*    </TableCell>*/}
                  {/*    <TableCell>{historyRow.customerId}</TableCell>*/}
                  {/*    <TableCell align="right">{historyRow.amount}</TableCell>*/}
                  {/*    <TableCell align="right">*/}
                  {/*      {Math.round(historyRow.amount * row.price * 100) / 100}*/}
                  {/*    </TableCell>*/}
                  {/*  </TableRow>*/}
                  {/*))}*/}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function DevicesTable({devices}:{devices: Array<DeviceData>}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Code</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => (
            <Row key={device.id} device={device} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DevicesTable