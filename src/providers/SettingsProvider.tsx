import { createContext, JSX, useState } from "react";
import { Modes, sessionTimeType } from "../components/Modes";

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

    const [sessionTime, setSessionTime] = useState<any>(Modes)

    return (
        <SettingsContext.Provider value={{ sessionTime, setSessionTime }}>
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