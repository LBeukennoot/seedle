import { useEffect, useState } from "react";
import type { SessionContextType, SessionProviderProps } from "./types";
import { SessionContext } from "./SessionContext";
import { useMode } from "../Mode";
import { useSettings } from "../Settings";
import type { SettingsContextType } from "../Settings/types";
import type { ModeContextType } from "../Mode/types";
import { Mode } from "../../features/session/sessionTypes";

export const getSessionsArray = (focusSessions: number = 4): Mode[] => {
    const isEven = (n: number) => {
        return n % 2 == 0;
    }

    return Array.apply(null, Array((focusSessions * 2))).map(function (x: any, i: number) { return i === (focusSessions * 2) - 1 ? Mode.LONG_REST : (isEven(i) ? Mode.FOCUS : Mode.REST); })
}

/**
 * Providing currentScreen to all screen components
 * 
 * @author      LBeukennoot
 * @created     02-05-2025
 */
export const SessionProvider = ({ children }: SessionProviderProps) => {

    const { sessionSettings }: SettingsContextType = useSettings()
    const { setMode }: ModeContextType = useMode()
    const [currentSession, setCurrentSession] = useState<number>(0)
    const [nextSession, setNextSession] = useState<Mode>(Mode.REST)


    const sessionsArray = getSessionsArray(sessionSettings.focusSessions)

    const toNextSession = () => {
        if (currentSession < sessionsArray.length - 1) {
            setCurrentSession(value => value + 1)
        } else {
            setCurrentSession(0)
        }
    }

    useEffect(() => {
        setMode(sessionsArray[currentSession])
        setNextSession(sessionsArray[currentSession + 1])
    }, [currentSession])

    const value: SessionContextType = {
        currentSession,
        setCurrentSession,
        toNextSession,
        sessionCount: sessionSettings.focusSessions,
        sessionsArray,
        nextSession,
        setNextSession
    }

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    )
}
