export type SettingsContextType = {
    sessionTime: SessionDataMap
    setSessionTime: Function
    sessionSettings: SessionSettings
    setSessionSettings: Function
}

export type SessionSettings = {
    focusSessions: number
    autoAdvance: boolean
    autoStartRest: boolean
    autoStartFocus: boolean
    startEndSound: boolean
}

export type SettingsProviderProps = {
    children: string | JSX.Element | JSX.Element[]
}