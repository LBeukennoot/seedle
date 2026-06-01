import type { Popup } from "../../components/Popup/types"
import type { Screen } from "../../navigation/Screen"

export type NavigationProviderProps = {
    children: string | JSX.Element | JSX.Element[]
}

export type NavigationContextType = {
    currentScreen: Screen
    setCurrentScreen: (screen: Screen) => void
    popup: JSX.Element | undefined
    setPopup: (popup: Popup) => void
    ScreenElement: () => JSX.Element
    panelExpanded: boolean
    setPanelExpanded: (panelExpanded: boolean) => void
}