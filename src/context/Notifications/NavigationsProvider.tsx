import { NotificationsContext } from "./NotificationsContext"
import type { NotificationsContextType, NotificationsProviderProps } from "./types"

export const NotificationsProvider = ({ children }: NotificationsProviderProps) => {
    const requestNotificationAccess = () => {
        if (!('Notification' in window)) {
            alert('This browser does not support desktop notification');
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission()
        }
    }

    const sendNotification = (message: string) => {
        requestNotificationAccess()
        if (Notification.permission !== 'granted') new Notification(message);
    }


    const value: NotificationsContextType = {
        sendNotification
    }

    return (
        <NotificationsContext.Provider value={value}>
            {children}
        </NotificationsContext.Provider>
    )
}