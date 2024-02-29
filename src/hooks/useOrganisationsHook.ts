import {useAppSelector} from "./hooks.ts";

export const useOrganisationData = () => {
  return useAppSelector((state) => state.organisation);
}