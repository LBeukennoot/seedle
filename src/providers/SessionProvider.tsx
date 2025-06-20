import { createContext, JSX, useContext, useEffect, useState } from "react";
import { SettingsContext } from "./SettingsProvider";
import { ModeContext } from "./ModeProvider";
import { Mode } from "../components/Modes";

// @ts-ignore
export const SessionContext = createContext<ISessionOptions>();

/**
 * Providing currentScreen to all screen components
 * 
 * @author      LBeukennoot
 * @created     02-05-2025
 */
export default function SessionProvider({ children }: ISessionOptionsProviderProps) {

    const { sessionSettings } = useContext(SettingsContext)
    const { setMode } = useContext(ModeContext)
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

    return (
        <SessionContext.Provider value={{ currentSession, setCurrentSession, toNextSession, sessionsArray, nextSession, setNextSession }}>
            {children}
        </SessionContext.Provider>
    )
}

interface ISessionOptionsProviderProps {
    children: string | JSX.Element | JSX.Element[]
}

export interface ISessionOptions {
    currentSession: number
    setCurrentSession: Function
    toNextSession: Function
    sessionsArray: string[]
    nextSession: Mode
    setNextSession: Function
}

type sessionType = {
    done: boolean
}