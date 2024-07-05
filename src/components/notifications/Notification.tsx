import {Notification as NotificationProps} from "../../reducers/notificationReducer.ts";
import {Alert} from "@mui/material";
import {removeNotification} from "../../utils/notifications.ts";
import {useAppDispatch} from "../../hooks/hooks.ts";
export function Notification({notification}:{notification:NotificationProps}) {
    const dispatch = useAppDispatch()
    return (
        <Alert
            severity={notification.severity}
            onClose={() => {removeNotification(dispatch, notification.id)}}
        >
            {notification.message}
        </Alert>
    )
}