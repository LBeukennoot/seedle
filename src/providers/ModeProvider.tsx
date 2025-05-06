import { createContext, JSX, useContext, useEffect, useState } from "react";
import { Modes, sessionTimeType } from "../components/Modes";
import { TimerContext } from "./TimerProvider";

// @ts-ignore
export const ModeContext = createContext<IModeOptions>();

/**
 * Providing currentScreen to all screen components
 * 
 * @author      LBeukennoot
 * @created     02-05-2025
 */
export default function ModeProvider({ children }: IModeOptionsProviderProps) {

    const [mode, setMode] = useState("focus")

    return (
        <ModeContext.Provider value={{ mode, setMode }}>
            {children}
        </ModeContext.Provider>
    )
}

interface IModeOptionsProviderProps {
    children: string | JSX.Element | JSX.Element[]
}

export interface IModeOptions {
    mode: string
    setMode: Function
}