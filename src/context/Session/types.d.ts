import type { Mode } from "../../features/session/sessionModes"

export type SessionProviderProps = {
    children: string | JSX.Element | JSX.Element[]
}

export type SessionContextType = {
    currentSession: number
    setCurrentSession: Dispatch<SetStateAction<number>>
    toNextSession: Function
    sessionCount: number
    sessionsArray: string[]
    nextSession: Mode
    setNextSession: Dispatch<SetStateAction<Mode>>
}