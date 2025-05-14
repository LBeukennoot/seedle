import { useContext } from "react"
import { NavigationContext } from "../providers/NavigationProvider"
import { Screens, ScreensType } from "./navigation/screens/ScreensIndex"

const Tab = ({ screens, currentScreen, setCurrentScreen }: TabType) => {
    return Object.keys(screens).map((key: string) => {
        const screen = screens[key]

        return (
            <div
                className={"py-3 px-4 rounded-l-full border-6 transition-all duration-150 " + (currentScreen === screen.name ? "bg-white border-white" : "bg-blue cursor-pointer border-blue hover:bg-light-blue")}
                onClick={() => setCurrentScreen(screen.name)}
                key={screen.id}
            >
                <screen.icon className={"transition-all duration-150 " + (currentScreen === screen.name ? "fill-blue" : "fill-white")} />
            </div>
        )
    })
}

export default function Tablist() {
    const { currentScreen, setCurrentScreen } = useContext(NavigationContext)

    return (
        <div className="">
            <Tab screens={Screens} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
        </div>
    )
}

type TabType = {
    screens: ScreensType
    currentScreen: string
    setCurrentScreen: Function
}