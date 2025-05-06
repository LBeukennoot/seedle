import { useContext } from "react"
import * as ScreensIndex from './screens/ScreensIndex'
import { NavigationContext, INavigationOptions } from "../../providers/NavigationProvider"
import Tablist from "../Tablist"

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
        <div className="w-screen h-screen flex bg-light-green text-blue font-lexend items-center justify-center">

            <div className="flex justify-center items-center h-full">

                <div className="flex items-start h-[30rem]">
                    <div className="mt-10">
                        <Tablist />
                    </div>

                    <div className="bg-white mx-auto max-w-xl rounded-3xl min-w-[30rem] min-h-[15rem] max-h-[30rem] transition-all">
                        <Screen />
                    </div>
                </div>

            </div>
        </div>
    )
}