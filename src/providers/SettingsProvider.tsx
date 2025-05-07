import { createContext, JSX, useEffect, useState } from "react";
import isSessionTimeType, { Modes, sessionTimeType } from "../components/Modes";
import LocalStorage from "../utils/LocalStorage";

const localStorage = new LocalStorage()

// @ts-ignore
export const SettingsContext = createContext<IModeOptions>();

/**
 * Providing currentScreen to all screen components
 * 
 * @author      LBeukennoot
 * @created     02-05-2025
 */
export default function SettingsProvider({ children }: IModeOptionsProviderProps) {

    // const { currentMode, getDisplayTime, start, pause } = useContext(TimerContext)

    const [sessionTime, setSessionTime] = useState<sessionTimeType>(Modes)

    const handleSetSessionTime = (value: sessionTimeType) => {
        localStorage.setValue("sessionTimes", value)
        setSessionTime(value)
    }

    useEffect(() => {
        const newSessionTime = localStorage.getValue("sessionTimes") as sessionTimeType

        if (isSessionTimeType(newSessionTime) === false) {
            console.error('Local storage value of "sessionTimes" is corrupted.');
            return
        }

        if (newSessionTime) setSessionTime(newSessionTime)
    }, [])

    return (
        <SettingsContext.Provider value={{ sessionTime, setSessionTime: handleSetSessionTime }}>
            {children}
        </SettingsContext.Provider>
    )
}

interface IModeOptionsProviderProps {
    children: string | JSX.Element | JSX.Element[]
}

export interface IModeOptions {
    sessionTime: sessionTimeType
    setSessionTime: Function
}