import { useContext } from "react"
import { NavigationContext } from "../../../providers/NavigationProvider"
import { TimerContext } from "../../../providers/TimerProvider"
import Sliderr from "../../Slider"

export default function SettingsScreen() {

    const { setCurrentScreen } = useContext(NavigationContext)
    // const { startTime, setStartTime } = useContext(TimerContext)


    return (
        <div className="m-8">
            <div>
                SETTINGS
                <Sliderr />
            </div>
        </div>
    )
}