import { useAppSelector} from "./hooks.ts";
import {AuthData} from "../reducers/loggedUserReducer.ts";

export const useAuthData = ():AuthData => {
  return useAppSelector((state) => state.auth);
}