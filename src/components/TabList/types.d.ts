import type { Screen } from "../../navigation/Screen"

export type TabListProps = {
    currentScreen: Screen
    setCurrentScreen: (screen: Screen) => void
}

export type TabProps = {
    screens: ScreensType
    currentScreen: Screen
    setCurrentScreen: (screen: Screen) => void
}