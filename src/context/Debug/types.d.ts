export type DebugProviderProps = {
    children: string | JSX.Element | JSX.Element[]
}

export type DebugContextType = {
    debugSettings: DebugSettings
    // urlParams: Object
}

export type DebugSettings = {
    debug: boolean
    screen: string
    mode: string
    disableSound: boolean | undefined
    focusTime: number | undefined
    restTime: number | undefined
    longRestTime: number | undefined
    autoAdvance: boolean | undefined
    autoStartFocus: boolean | undefined
    autoStartRest: boolean | undefined
    focusSessions: number | undefined
}

export type handleSetDebugSettings = {
    paramName: string
    value?: Function
}