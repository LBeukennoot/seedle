import { createContext, type JSX, useContext, useEffect, useState } from "react";
import { DevContext } from "./DevProvider";
import { DefaultScreen, Screens, Screen } from "../navigation/screens/ScreensIndex";
import { NavigationContext } from "./NavigationContext";

// @ts-ignore
// export const NavigationContext = createContext<INavigationOptions>();

/**
 * Providing currentScreen to all screen components
 * 
 * @author      LBeukennoot
 * @created     19-03-2025
 */
export default function NavigationProvider({ children }: INavigationOptionsProviderProps) {

    const [currentScreen, setCurrentScreen] = useState<Screen>(DefaultScreen)
    const [popup, setPopup] = useState<JSX.Element | undefined>(undefined)

    const { devSettings } = useContext(DevContext)


    useEffect(() => {
        let devScreenString = devSettings?.current.screen?.toUpperCase()
        if (!devScreenString) return


        let devScreen = Screen[devScreenString as keyof typeof Screen]
        if (!devScreen) return

        setCurrentScreen(devScreen)
    }, [devSettings])


    const ScreenElement = () => {
        
        const DefaultScreenComponent = Screens[DefaultScreen]?.screen

        if (!currentScreen) return <DefaultScreenComponent />

        const ScreenComponent = Screens[currentScreen.toString()]?.screen

        if (!ScreenComponent) return <DefaultScreenComponent />

        return <ScreenComponent />
    }


    return (
        <NavigationContext.Provider value={{ currentScreen, setCurrentScreen, popup, setPopup, ScreenElement }}>
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
    popup: JSX.Element | undefined
    setPopup: Function
    ScreenElement: () => JSX.Element
}
