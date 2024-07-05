import AppLayout from "../../components/AppLayout.tsx";
import Typography from "@mui/material/Typography";
import DeviceForm from "../../components/devices/deviceForm.tsx";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useDevicesData } from "../../hooks/useDevicesDataHook.ts";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import deviceService from "../../services/devices.ts";
import { setDevices } from "../../reducers/devicesReducer.ts";
import { useAuthData } from "../../hooks/useAuthHook.ts";
import { useAppDispatch } from "../../hooks/hooks.ts";

function UpdateDevice(){

    useEffect(() => {
        // TODO: remove duplications (loading devices)
        const loadDevices = async () => {
            const devices = await deviceService.get(auth)
            dispatch(setDevices(devices))
            console.log("loaded devices", devices)
        }

        if (devices.length === 0) {
            loadDevices()
        } else {
            console.log("devices already loaded", devices)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const { id} = useParams()
    const navigate = useNavigate()
    const devices = useDevicesData()
    const deviceToEdit = devices.find((device) => device.id === id)
    const auth = useAuthData()
    const dispatch = useAppDispatch()
    console.log(deviceToEdit)
    console.log(id)


    return (
        <>
            <AppLayout>
                <Typography variant="h4" gutterBottom>
                    Update Device
                </Typography>
                <Box maxWidth="600px">
                    <DeviceForm onCancelClick={() => {navigate("/devices")}} onConfirmClick={() => {navigate("/devices")}} device={deviceToEdit}/>
                </Box>
            </AppLayout>
            {/*{devices.map((device, key) => (<p key={key}>{device.name}</p>))}*/}
        </>
    )
}

export default UpdateDevice