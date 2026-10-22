export type SettingsContextType = {
    sessionTime: SessionDataMap
    setSessionTime: (sessionTime: SessionDataMap) => void
    settings: Settings
    setSettings: (settings: Settings) => void
}

export type Settings = {
    sessions: {
      autoAdvance: boolean
    },

    sounds: {
      startEndSound: boolean,
      volume: number
    },

    notifications: {
      timerCompleteNotification: boolean
    },

    graphics: {
      turbulenceFilter: boolean,
      noiseFilter: boolean,
      wateringCanColor: string
    },

    // focusSessions: number
    // autoAdvance: boolean
    // autoStartRest: boolean
    // autoStartFocus: boolean
    // startEndSound: boolean
    // timerCompleteNotification: boolean
    // tabNotification: boolean
}

export type SettingsProviderProps = {
    children: string | JSX.Element | JSX.Element[]
}