import {useSelector} from 'react-redux';

export const useMeasurementData = () => {
  return useSelector((state) => state.measurementForm);
}