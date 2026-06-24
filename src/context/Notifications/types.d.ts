export type NotificationsProviderProps = {
    children: string | JSX.Element | JSX.Element[]
}

export type NotificationsContextType = {
    sendNotification: (message: string) => void
}