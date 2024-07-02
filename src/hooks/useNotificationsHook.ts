import { useAppSelector} from "./hooks.ts";
import {Notification} from "../reducers/notificationReducer.ts";

export const useNotifications = ():Array<Notification> => {
    return useAppSelector((state) => state.notifications);
}