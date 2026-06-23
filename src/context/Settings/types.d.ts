export type SettingsContextType = {
    sessionTime: SessionDataMap
    setSessionTime: (sessionTime: SessionDataMap) => void
    sessionSettings: SessionSettings
    setSessionSettings: (sessionSettings: SessionSettings) => void
}

export type SessionSettings = {
    focusSessions: number
    autoAdvance: boolean
    autoStartRest: boolean
    autoStartFocus: boolean
    startEndSound: boolean
    timerCompleteNotification: boolean
}

export type SettingsProviderProps = {
    children: string | JSX.Element | JSX.Element[]
}