export type SessionProviderProps = {
    children: string | JSX.Element | JSX.Element[]
}

export type SessionContextType = {
    currentSession: number
    setCurrentSession: Function
    toNextSession: Function
    sessionsArray: string[]
    nextSession: Mode
    setNextSession: Function
}