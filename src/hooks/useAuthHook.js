import {useSelector} from 'react-redux';

export const useAuthData = () => {
  return useSelector((state) => state.auth);
}