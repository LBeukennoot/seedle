import { useEffect, useState } from "react";
import type { SessionSettings, SettingsContextType, SettingsProviderProps } from "./types";
import LocalStorage from "../../utils/LocalStorage";
import { SettingsContext } from "./SettingsContext";
import { useDebug } from "../Debug";
import type { SessionDataMap } from "../../features/session/sessionTypes";
import { isSessionTimeType, Modes } from "../../features/session/sessionModes";

const localStorage = new LocalStorage()

/**
 * Providing currentScreen to all screen components
 * 
 * @author      LBeukennoot
 * @created     02-05-2025
 */
export const SettingsProvider = ({ children }: SettingsProviderProps) => {

    const { debugSettings } = useDebug()

    const [sessionTime, setSessionTime] = useState<SessionDataMap>(Modes)
    const [sessionSettings, setSessionSettings] = useState<SessionSettings>({
        focusSessions: 4,
        autoAdvance: false,
        autoStartRest: false,
        autoStartFocus: false,
        startEndSound: true,
        timerCompleteNotification: true,
        tabNotification: true
    })


    const handleSetSessionTime = (value: SessionDataMap) => {
        localStorage.setValue("sessionTimes", value)
        setSessionTime(value)
    }

    const handleSetSessionSettings = (value: SessionSettings) => {
        localStorage.setValue("sessionSettings", value)
        setSessionSettings(value)
    }

    useEffect(() => {
        const newSessionTime = localStorage.getValue("sessionTimes") as SessionDataMap | undefined
        // const newSessionTime = {focus: {id: 1, time: 5, max: 2, min: 3}, rest: {id: 1, time: 5, max: 2, min: 3}, long_rest: {id: 1, time: 5, max: 2, min: 3}}

        debugSettings.debug && console.log(newSessionTime)

        if (newSessionTime) {
            if (!isSessionTimeType(newSessionTime)) {
                console.error('Local storage value of "sessionTimes" is corrupted.');
                return
            }

            setSessionTime(newSessionTime)
        }

        // applying devsettings (only if they are provided)
        setSessionTime(value => {
            return {
                ...value,
                focus: {
                    ...value.focus,
                    time: debugSettings.focusTime ? debugSettings.focusTime : value.focus.time
                },
                rest: {
                    ...value.rest,
                    time: debugSettings.restTime ? debugSettings.restTime : value.rest.time
                },
                long_rest: {
                    ...value.long_rest,
                    time: debugSettings.longRestTime ? debugSettings.longRestTime : value.long_rest.time
                }
            }
        })



        const newSessionSettings = localStorage.getValue("sessionSettings") as SessionSettings

        if (newSessionSettings) setSessionSettings(newSessionSettings)

        // applying devsettings (only if they are provided)
        setSessionSettings(prev => {
            return {
                ...prev,
                autoAdvance: debugSettings.autoAdvance ?? prev.autoAdvance,
                autoStartFocus: debugSettings.autoStartFocus ?? prev.autoStartFocus,
                autoStartRest: debugSettings.autoStartRest ?? prev.autoStartRest,
                focusSessions: debugSettings.focusSessions ?? prev.focusSessions,
                startEndSound: debugSettings.disableSound !== undefined
                    ? !debugSettings.disableSound
                    : prev.startEndSound
            }
        })

    }, [debugSettings])

    const value: SettingsContextType = {
        sessionTime,
        setSessionTime: handleSetSessionTime,
        sessionSettings,
        setSessionSettings: handleSetSessionSettings
    }

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    )
}