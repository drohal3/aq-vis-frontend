import {useSelector} from 'react-redux';

export const useDevicesData = () => {
  return useSelector((state) => state.devices);
}