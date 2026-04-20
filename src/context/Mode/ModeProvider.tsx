import { useEffect, useState } from "react";
import type { ModeProviderProps } from "./types";
import { ModeContext } from "./ModeContext";
import { Mode } from "../../components/Modes";
import { useDebug } from "../Debug";

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
        let devModeString = debugSettings?.mode?.toUpperCase()
        if (!devModeString) return


        let devMode = Mode[devModeString as keyof typeof Mode]
        if (!devMode) return

        setMode(devMode)
    }, [debugSettings])

    return (
        <ModeContext.Provider value={{ mode, setMode }}>
            {children}
        </ModeContext.Provider>
    )
}

