import { ScreenRegistry, type ScreensType } from "../../navigation/ScreenRegistry"
import type { Screen } from "../../navigation/Screen"
import { useNavigation } from "../../context/Navigation"

const Tab = ({ screens, currentScreen, setCurrentScreen }: TabProps) => {
    return (Object.keys(screens) as Screen[]).map((key) => {
        const screen = screens[key]
        return (
            <div
                className={"pt-4 pb-25 px-3 md:py-3 md:pl-4 md:pr-20 rounded-full md:rounded-r-none md:rounded-l-full border-6 transition-colors duration-150 border-b-0 md:border-b-6 " + (currentScreen.toString() === key ? "bg-white border-white " : "bg-blue cursor-pointer border-blue hover:bg-light-blue ")}
                onClick={() => setCurrentScreen(key)}
                key={key}
            >
                <screen.icon className={"transition-all duration-150 " + (currentScreen.toString() === key ? "fill-blue" : "fill-white")} />
            </div>
        )
    })
}

export const TabList = () => {
    const { currentScreen, setCurrentScreen } = useNavigation()

    return (
        <div className={"flex md:inline-block w-screen max-w-xl md:w-auto"}>
            <Tab screens={ScreenRegistry} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
        </div>
    )
}

type TabProps = {
    screens: ScreensType
    currentScreen: Screen
    setCurrentScreen: Function
}