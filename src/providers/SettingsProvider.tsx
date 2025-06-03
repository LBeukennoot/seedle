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

    const [sessionTime, setSessionTime] = useState<sessionTimeType>(Modes)
    const [sessionSettings, setSessionSettings] = useState<sessionSettingsType>({
        focusSessions: 4,
        autoAdvance: false,
        autoStartRest: false,
        autoStartFocus: false

    })

    const handleSetSessionTime = (value: sessionTimeType) => {
        localStorage.setValue("sessionTimes", value)
        setSessionTime(value)
    }

    const handleSetSessionSettings = (value: sessionSettingsType) => {
        localStorage.setValue("sessionSettings", value)
        setSessionSettings(value)
    }

    useEffect(() => {
        const newSessionTime = localStorage.getValue("sessionTimes") as sessionTimeType

        if (isSessionTimeType(newSessionTime) === false) {
            console.error('Local storage value of "sessionTimes" is corrupted.');
            return
        }

        if (newSessionTime) setSessionTime(newSessionTime)


        const newSessionSettings = localStorage.getValue("sessionSettings") as sessionSettingsType

        // TODO
        // if (isSessionTimeType(newSessionTime) === false) {
        //     console.error('Local storage value of "sessionTimes" is corrupted.');
        //     return
        // }

        if (newSessionSettings) setSessionSettings(newSessionSettings)
    }, [])

    return (
        <SettingsContext.Provider value={{ sessionTime, setSessionTime: handleSetSessionTime, sessionSettings, setSessionSettings: handleSetSessionSettings }}>
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
    sessionSettings: sessionSettingsType
    setSessionSettings: Function
}

type sessionSettingsType = {
    focusSessions: number
    autoAdvance: boolean
    autoStartRest: boolean
    autoStartFocus: boolean
}