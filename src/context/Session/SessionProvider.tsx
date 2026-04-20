import { useEffect, useState } from "react";
import type { SessionContextType, SessionProviderProps } from "./types";
import { Mode } from "../../components/Modes";
import { SessionContext } from "./SessionContext";
import { useMode } from "../Mode";
import { useSettings } from "../Settings";

// @ts-ignore

/**
 * Providing currentScreen to all screen components
 * 
 * @author      LBeukennoot
 * @created     02-05-2025
 */
export const SessionProvider = ({ children }: SessionProviderProps) => {

    const { sessionSettings } = useSettings()
    const { setMode } = useMode()
    const [currentSession, setCurrentSession] = useState(0)
    const [nextSession, setNextSession] = useState(Mode.REST)

    function isEven(n: number) {
        return n % 2 == 0;
    }

    const sessionsArray = Array.apply(null, Array((sessionSettings.focusSessions * 2))).map(function (x, i) { return i === (sessionSettings.focusSessions * 2) - 1 ? Mode.LONG_REST : (isEven(i) ? Mode.FOCUS : Mode.REST); })

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