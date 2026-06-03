import { useEffect, useState } from "react";
import { NavigationContext } from "./NavigationContext";
import type { NavigationContextType, NavigationProviderProps } from "./types";
import type { Popup } from "../../components/Popup/types";
import { DefaultScreen, isScreen, ScreenRegistry } from "../../navigation/ScreenRegistry";
import { Screen } from "../../navigation/Screen";
import { useDebug } from "../Debug";

/**
 * Providing currentScreen to all screen components
 * 
 * @author      LBeukennoot
 * @created     19-03-2025
 */
export const NavigationProvider = ({ children }: NavigationProviderProps) => {

    const [currentScreen, setCurrentScreen] = useState<Screen>(DefaultScreen)
    const [panelExpanded, setPanelExpanded] = useState<boolean>(false)
    const [popup, setPopup] = useState<Popup>()

    const { debugSettings } = useDebug()


    useEffect(() => {
        let devScreenString = debugSettings.screen?.toUpperCase()
        if (!devScreenString) return


        let devScreen = Screen[devScreenString as keyof typeof Screen]
        if (!devScreen) return

        setCurrentScreen(devScreen)
    }, [debugSettings])


    const ScreenElement = () => {

        const DefaultScreenComponent = ScreenRegistry[DefaultScreen]?.screen

        if (!currentScreen) return <DefaultScreenComponent />

        const value = currentScreen.toString()
        const ScreenComponent = isScreen(value) && ScreenRegistry[value]?.screen

        if (!ScreenComponent) return <DefaultScreenComponent />

        return <ScreenComponent />
    }


    const value: NavigationContextType = {
        currentScreen, 
        setCurrentScreen, 
        popup, 
        setPopup, 
        ScreenElement,
        panelExpanded,
        setPanelExpanded
    }

    return (
        <NavigationContext.Provider value={value}>
            {children}
        </NavigationContext.Provider>
    )
}
