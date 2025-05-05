import { createContext, JSX, useState } from "react";
import { Mode } from "../components/Mode";

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

    const [sessionTime, setSessionTime] = useState<sessionTimeType>(
        {
            focus: {
                mode: Mode.FOCUS,
                time: 25,
                min: 19,
                max: 91
            },
            rest: {
                mode: Mode.REST,
                time: 5,
                min: -1,
                max: 20
            },
            long_rest: {
                mode: Mode.LONG_REST,
                time: 25,
                min: 14,
                max: 61
            }
        }
    )

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

export type sessionTimeType = {
    [key: string]: {
        mode: Mode,
        time: number,
        min: number,
        max: number
    }
} 