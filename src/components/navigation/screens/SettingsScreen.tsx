import { useContext } from "react"
import { NavigationContext } from "../../../providers/NavigationProvider"
import { TimerContext } from "../../../providers/TimerProvider"

export default function SettingsScreen() {

    const { setCurrentScreen } = useContext(NavigationContext)
    const { startTime, setStartTime } = useContext(TimerContext)


    return (
        <div>
            <div>
                settings
            </div>

            <div>
                <input type="number" value={startTime} onChange={(e) => setStartTime(e.target.value)} max={60} />
            </div>

            <div>
                <button onClick={() => setCurrentScreen("focus")}>go to focus</button>
            </div>
        </div>
    )
}