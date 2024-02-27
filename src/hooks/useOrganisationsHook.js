import {useSelector} from 'react-redux';

export const useOrganisationData = () => {
  return useSelector((state) => state.organisation);
}