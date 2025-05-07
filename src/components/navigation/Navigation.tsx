import { useContext } from "react"
import { NavigationContext, INavigationOptions } from "../../providers/NavigationProvider"
import Tablist from "../Tablist"
import { DefaultScreen, Screens } from "./screens/ScreensIndex"
import ScreenCard from "./screens/ScreenCard"

export default function Navigation() {

    const { currentScreen } = useContext<INavigationOptions>(NavigationContext)


    const Screen = () => {
        const defaultScreen = Screens[DefaultScreen]?.screen

        if (!currentScreen) return defaultScreen

        const screen = Screens[currentScreen]?.screen

        if (!screen) return defaultScreen

        return screen
    }

    return (
        <div className="w-screen h-screen flex bg-light-green text-blue font-lexend items-center justify-center">

            <div className="flex justify-center items-center h-full">

                <div className="flex items-start h-[30rem]">
                    <div className="mt-10">
                        <Tablist />
                    </div>

                    <ScreenCard>
                        <Screen />
                    </ScreenCard>
                    <div className="">

                    </div>
                </div>

            </div>
        </div>
    )
}