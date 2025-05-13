import { createContext, JSX, useContext, useEffect, useState } from "react";
import { DefaultScreen, Screen, Screens } from "../components/navigation/screens/ScreensIndex";
import { DevContext } from "./DevProvider";

// @ts-ignore
export const NavigationContext = createContext<INavigationOptions>();

/**
 * Providing currentScreen to all screen components
 * 
 * @author      LBeukennoot
 * @created     19-03-2025
 */
export default function NavigationProvider({ children }: INavigationOptionsProviderProps) {

    const [currentScreen, setCurrentScreen] = useState<Screen>(DefaultScreen)

    const { devSettings } = useContext(DevContext)


    useEffect(() => {
        let devScreenString = devSettings?.screen?.toUpperCase()
        if (!devScreenString) return


        let devScreen = Screen[devScreenString as keyof typeof Screen]
        if (!devScreen) return

        setCurrentScreen(devScreen)
    }, [devSettings])


    const ScreenElement = () => {
        const defaultScreen = Screens[DefaultScreen]?.screen

        if (!currentScreen) return defaultScreen

        const screen = Screens[currentScreen]?.screen

        if (!screen) return defaultScreen

        return screen
    }


    return (
        <NavigationContext.Provider value={{ currentScreen, setCurrentScreen, ScreenElement }}>
            {children}
        </NavigationContext.Provider>
    )
}

interface INavigationOptionsProviderProps {
    children: string | JSX.Element | JSX.Element[]
}

export interface INavigationOptions {
    currentScreen: Screen
    setCurrentScreen: Function
    ScreenElement: () => JSX.Element
}