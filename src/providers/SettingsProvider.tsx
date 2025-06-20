import { createContext, JSX, useContext, useEffect, useState } from "react";
import isSessionTimeType, { Modes, sessionTimeType } from "../components/Modes";
import LocalStorage from "../utils/LocalStorage";
import { DevContext } from "./DevProvider";

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

    const { devSettings } = useContext(DevContext)

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

        // retreiving value from localStorage and checking its value
        if (isSessionTimeType(newSessionTime) === false) {
            console.error('Local storage value of "sessionTimes" is corrupted.');
            return
        }

        if (newSessionTime) setSessionTime(newSessionTime)

        // applying devsettings (only if they are provided)
        setSessionTime(value => {
            return {
                ...value,
                focus: {
                    ...value.focus,
                    time: devSettings.current.focusTime ? devSettings.current.focusTime : value.focus.time
                },
                rest: {
                    ...value.rest,
                    time: devSettings.current.restTime ? devSettings.current.restTime : value.rest.time
                },
                long_rest: {
                    ...value.long_rest,
                    time: devSettings.current.longRestTime ? devSettings.current.longRestTime : value.long_rest.time
                }
            }
        })



        const newSessionSettings = localStorage.getValue("sessionSettings") as sessionSettingsType

        // TODO check local storage value is correct
        // if (isSessionTimeType(newSessionTime) === false) {
        //     console.error('Local storage value of "sessionTimes" is corrupted.');
        //     return
        // }

        if (newSessionSettings) setSessionSettings(newSessionSettings)

        // applying devsettings (only if they are provided)
        setSessionSettings(value => {
            return {
                ...value,
                autoAdvance: devSettings.current.autoAdvance ? devSettings.current.autoAdvance : value.autoAdvance,
                autoStartFocus: devSettings.current.autoStartFocus ? devSettings.current.autoStartFocus : value.autoStartFocus,
                autoStartRest: devSettings.current.autoStartRest ? devSettings.current.autoStartRest : value.autoStartRest,
                focusSessions: devSettings.current.focusSessions ? devSettings.current.focusSessions : value.focusSessions
            }
        })
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