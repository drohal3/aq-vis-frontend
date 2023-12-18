import deviceService from '../services/devices'
import {useEffect, useState} from "react";
import {useAuthData} from "../hooks/useAuthHooks";
function Dashboard(){
  const auth = useAuthData()
  const [devices, setDevices] = useState([])

  useEffect( () => {
    async function fetchData() {
      const devices = await deviceService.devices(auth)
      setDevices(devices)
      console.log(devices)
    }

    fetchData()
  }, [])


  return (
    <>
      This is dashboard
      {devices.map((device, key) => (<p key={key}>{device.name}</p>))}
    </>
  )
}

export default Dashboard