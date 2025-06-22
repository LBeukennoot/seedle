import { useContext } from "react"
import { NavigationContext } from "../providers/NavigationProvider"
import { Screens, ScreensType } from "./navigation/screens/ScreensIndex"

const Tab = ({ screens, currentScreen, setCurrentScreen }: TabType) => {
    return Object.keys(screens).map((key: string) => {
        const screen = screens[key]

        return (
            <div
                className={"pt-4 pb-20 px-3 md:py-3 md:pl-4 md:pr-20 rounded-full md:rounded-r-none md:rounded-l-full border-6 transition-all duration-150 border-b-0 md:border-b-6 " + (currentScreen === screen.name ? "bg-white border-white " : "bg-blue cursor-pointer border-blue hover:bg-light-blue ")}
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
        <div className={"flex md:inline-block"}>
            <Tab screens={Screens} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
        </div>
    )
}

type TabType = {
    screens: ScreensType
    currentScreen: string
    setCurrentScreen: Function
}