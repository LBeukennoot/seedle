import { useContext } from "react"
import Slider from "../../Slider"
import { SettingsContext } from "../../../providers/SettingsProvider"
import { Mode } from "../../Mode"

export default function SettingsScreen() {

    const { sessionTime, setSessionTime } = useContext(SettingsContext)

    const handleValueChange = ({ newValue, mode }: { newValue: number, mode: any }) => {
        setSessionTime({
            ...sessionTime,
            [mode]: {
                ...sessionTime[mode],
                time: newValue
            }
        })
    }

    return (
        <div className="m-10">
            <h1 className="text-3xl mb-3">settings</h1>
            <h2 className="text-lg mb-3 font-bold">session time</h2>
            <hr className="border-1 mb-3 rounded-full text-light-blue"></hr>

            <h3 className="text-lg">focus</h3>
            <Slider
                min={5}
                max={120}
                safeZone={{
                    min: sessionTime.focus.min,
                    max: sessionTime.focus.max
                }}
                invert={true}
                value={sessionTime.focus.time}
                setValue={(newValue: number) => handleValueChange({ newValue, mode: "focus" })}
            />

            <h3 className="text-lg">rest</h3>
            <Slider
                min={5}
                max={120}
                safeZone={{
                    min: sessionTime.rest.min,
                    max: sessionTime.rest.max
                }}
                invert={true}
                value={sessionTime.rest.time}
                setValue={(newValue: number) => handleValueChange({ newValue, mode: "rest" })}
            />

            <h3 className="text-lg">long rest</h3>
            <Slider
                min={5}
                max={120}
                safeZone={{
                    min: sessionTime.long_rest.min,
                    max: sessionTime.long_rest.max
                }}
                invert={true}
                value={sessionTime.long_rest.time}
                setValue={(newValue: number) => handleValueChange({ newValue, mode: "long_rest" })}
            />
        </div>
    )
}