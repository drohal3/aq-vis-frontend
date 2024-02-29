import { useAppSelector} from "./hooks.ts";

export const useAuthData = () => {
  return useAppSelector((state) => state.auth);
}