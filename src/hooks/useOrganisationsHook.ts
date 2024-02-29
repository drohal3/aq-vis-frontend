import {useAppSelector} from "@src/hooks/hooks";

export const useOrganisationData = () => {
  return useAppSelector((state) => state.organisation);
}