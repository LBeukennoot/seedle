import type { Screen } from "../../navigation/Screen"

export type NavigationProviderProps = {
    children: string | JSX.Element | JSX.Element[]
}

export type NavigationContextType = {
    currentScreen: Screen
    setCurrentScreen: Function
    popup: JSX.Element | undefined
    setPopup: Function
    ScreenElement: () => JSX.Element
}