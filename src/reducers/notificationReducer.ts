import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from "../utils/store.ts";

export type SeverityType = "success" | "info" | "warning" | "error";
export interface Notification {
    id: number
    message: string
    severity: SeverityType
}

// const example = [
//     {
//         id: 1,
//         message: "some message",
//         severity: "error"
//     },
//     {
//         id: 2,
//         message: "some other message",
//         severity: "warning"
//     }
// ]

const initialState = Array<Notification>()

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        add: (state, action) => { //login
            return [...state,action.payload]
        },
        remove: (state, action) => {
            return state.filter(n => n.id != action.payload)
        },
        reset: () => { //logout
            return initialState
        }
    }
})

export const { add, remove, reset } = notificationSlice.actions;

export const addNotificationToState = (notification:Notification) => {
    return (dispatch: AppDispatch) => {
        dispatch(add(notification));
    }
}

export const removeNotificationFromState = (notificationId:number) => {
    return (dispatch: AppDispatch) => {
        dispatch(remove(notificationId));
    }
}

export const resetNotificationState = () => {
    return (dispatch: AppDispatch) => {
        dispatch(reset());
    }
}

export default notificationSlice.reducer