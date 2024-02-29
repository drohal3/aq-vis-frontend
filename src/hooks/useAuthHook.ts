import { useAppSelector } from "@src/hooks/hooks";

export const useAuthData = () => {
  return useAppSelector((state) => state.auth);
}