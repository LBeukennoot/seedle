import { useContext } from "react"
import { NavigationContext } from "../providers/NavigationProvider"
import { Screens } from "./navigation/screens/ScreensIndex"

const Tab = ({ screens, currentScreen, setCurrentScreen }: any) => {
    return Object.keys(screens).map((key: string) => {
        const screen = screens[key]

        return (
            <div
                className={"py-4 px-3 rounded-l-xl transition-all " + (currentScreen === screen.name ? "bg-white" : "bg-light-blue cursor-pointer")}
                onClick={() => setCurrentScreen(screen.name)}
                key={screen.id}
            >
                {screen.icon}
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