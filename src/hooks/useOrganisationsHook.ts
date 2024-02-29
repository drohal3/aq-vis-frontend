import {useAppSelector} from "./hooks.ts";
import {OrganisationData} from "../reducers/organisationsReducer.ts";

export const useOrganisationData = ():OrganisationData => {
  return useAppSelector((state) => state.organisation);
}