import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux-hooks'
import { removeNotification } from '@/shared/model/notifications/slice'
import { Alert, Snackbar } from '@mui/material'

export const NotificationContainer = () => {
    const dispatch = useAppDispatch()

    const notifications = useAppSelector(
        (state) => state.notificationsReducer.notifications
    )

    return (
        <>
            {notifications.map((notification, index) => (
                <Snackbar
                    key={notification.id}
                    open
                    autoHideDuration={notification.duration ?? 5000}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    sx={{
                        bottom: `${24 + index * 70}px`,
                    }}
                    onClose={() =>
                        dispatch(removeNotification(notification.id))
                    }
                >
                    <Alert severity={notification.type} variant="filled">
                        {notification.message}
                    </Alert>
                </Snackbar>
            ))}
        </>
    )
}
