import {useSelector} from 'react-redux';

export const useUnitsData = () => {
  return useSelector((state) => state.units);
}