import { createContext, JSX, useContext, useEffect, useState } from "react";
import { DevContext } from "./DevProvider";
import { Mode } from "../components/Modes";

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

    const { devSettings } = useContext(DevContext)

    useEffect(() => {
        let devModeString = devSettings?.current.mode?.toUpperCase()
        if (!devModeString) return


        let devMode = Mode[devModeString as keyof typeof Mode]
        if (!devMode) return

        setMode(devMode)
    }, [devSettings])

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