import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Notification, NotificationsState } from './types'

const initialState: NotificationsState = {
    notifications: [],
}
export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (state, actions: PayloadAction<Notification>) => {
            state.notifications.push(actions.payload)
        },
        removeNotification(state, action: PayloadAction<string>) {
            state.notifications = state.notifications.filter(
                (n) => n.id !== action.payload
            )
        },
        clearNotifications(state) {
            state.notifications = []
        },
    },
})

export const { addNotification, removeNotification, clearNotifications } =
    notificationsSlice.actions
