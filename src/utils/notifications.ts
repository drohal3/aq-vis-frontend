import {addNotificationToState, removeNotificationFromState, SeverityType} from "../reducers/notificationReducer.ts"
import {AppDispatch} from "./store.ts";
export const addNotification = (dispatch:AppDispatch, message:string, severity:SeverityType, delaySeconds: number = 2) => {
    let timeoutId = -1

    const handler = () => {
        dispatch(removeNotificationFromState(timeoutId))
    }

    timeoutId = setTimeout(
        handler,
        delaySeconds * 1000
    )

    dispatch(addNotificationToState({
        id: timeoutId,
        message,
        severity
    }))
}

export const removeNotification = (dispatch:AppDispatch, notificationId:number) => {
    dispatch(removeNotificationFromState(notificationId))
}