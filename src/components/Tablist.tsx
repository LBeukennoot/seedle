import { useContext } from "react"
import { NavigationContext } from "../providers/NavigationProvider"
import TimerIcon from "./TimerIcon"
import SettingsIcon from "./SettingsIcon"

const Tab = ({ screens, currentScreen, setCurrentScreen }: any) => {


    return screens.map((s: any) => {

        return (
            <div
                className={"py-4 px-3 rounded-l-xl transition-all " + (currentScreen === s.name ? "bg-white" : "bg-light-blue cursor-pointer")}
                onClick={() => setCurrentScreen(s.name)}
            >
                {s.icon}
            </div>
        )
    })
}

export default function Tablist() {
    const { currentScreen, setCurrentScreen } = useContext(NavigationContext)

    const screens = [
        {
            name: 'focus',
            icon: <TimerIcon />
        },
        {
            name: 'settings',
            icon: <SettingsIcon />
        }
    ]

    return (
        <div className="">
            <Tab screens={screens} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
        </div>
    )
}