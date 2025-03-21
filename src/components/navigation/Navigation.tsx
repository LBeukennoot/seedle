import { useContext } from "react"
import * as ScreensIndex from './screens/ScreensIndex'
import { NavigationContext, INavigationOptions } from "../../providers/NavigationProvider"

export default function Navigation() {

    const { currentScreen } = useContext<INavigationOptions>(NavigationContext)
    

    const Screen = () => {
        switch (currentScreen) {
            case "focus":
                return (
                    <ScreensIndex.Focus />
                )

            case "settings":
                return (
                    <ScreensIndex.Settings />
                )

            default:
                return (
                    <ScreensIndex.Focus />
                )
        }
    }

    return (
        <Screen />
    )
}