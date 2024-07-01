import {addNotificationToState, removeNotificationFromState, SeverityType} from "../reducers/notificationReducer.ts"
import {AppDispatch} from "./store.ts";
export const addNotification = (dispatch:AppDispatch, message:string, severity:SeverityType, delay: number = 2000) => {
    let timeoutId = -1

    const handler = () => {
        dispatch(removeNotificationFromState(timeoutId))
    }

    timeoutId = setTimeout(
        handler,
        delay
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