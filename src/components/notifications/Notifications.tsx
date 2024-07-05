import {useNotifications} from "../../hooks/useNotificationsHook.ts";
import {Notification} from "./Notification.tsx";
import Box from "@mui/material/Box";
export function Notifications() {
    const notifications = useNotifications()

    return (
        <>
            {notifications.map(notification => (
                <Box key={notification.id} sx={{m:.5}}>
                    <Notification notification={notification} />
                </Box>
            ))}
        </>
    )
}