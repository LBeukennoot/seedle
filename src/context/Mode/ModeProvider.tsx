import { useEffect, useState } from "react";
import type { ModeProviderProps } from "./types";
import { ModeContext } from "./ModeContext";
import { useDebug } from "../Debug";
import { Mode } from "../../features/session/sessionTypes";

/**
 * Providing currentScreen to all screen components
 * 
 * @author      LBeukennoot
 * @created     02-05-2025
 */
export const ModeProvider = ({ children }: ModeProviderProps) => {

    const [mode, setMode] = useState<Mode>(Mode.FOCUS)

    const { debugSettings } = useDebug()

    useEffect(() => {
        let debugModeString = debugSettings?.mode?.toUpperCase()
        if (!debugModeString) return


        let debugMode = Mode[debugModeString as keyof typeof Mode]
        if (!debugMode) return

        setMode(debugMode)
    }, [debugSettings])

    return (
        <ModeContext.Provider value={{ mode, setMode }}>
            {children}
        </ModeContext.Provider>
    )
}

