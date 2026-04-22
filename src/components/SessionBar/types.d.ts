import type { SessionDataMap } from "../../features/session/sessionModes"

export type SessionBarProps = {
    currentSession: number
    setCurrentSession: (session: number) => void
    sessionCount: number
    sessionTime: SessionDataMap
}