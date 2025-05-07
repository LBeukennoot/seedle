import { createContext, JSX, useState } from "react";
import { DefaultScreen, Screen } from "../components/navigation/screens/ScreensIndex";

// @ts-ignore
export const NavigationContext = createContext<INavigationOptions>( );

/**
 * Providing currentScreen to all screen components
 * 
 * @author      LBeukennoot
 * @created     19-03-2025
 */
export default function NavigationProvider({ children }: INavigationOptionsProviderProps) {

    const [currentScreen, setCurrentScreen] = useState<Screen>(DefaultScreen)

    return (
        <NavigationContext.Provider value={{ currentScreen, setCurrentScreen }}>
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
}