import { useContext } from "react"
import { TimerContext } from "../../../providers/TimerProvider"
import SwitchButton from "../../SwitchButton/SwitchButton"
import Button from "../../Button"
import Timer from "../../Timer"
import { Modes, sessionTimeType } from "../../Modes"
import { ModeContext } from "../../../providers/ModeProvider"
const sound = new Audio('../../assets/sounds/begin_sound.wav')

export default function FocusScreen() {

    const { mode, setMode } = useContext(ModeContext)
    const { getDisplayTime, start, pause, isTimerRunning } = useContext(TimerContext)

    //@ts-ignore
    const buttons: sessionTimeType[] = Object.keys(Modes).map((key: string) => Modes[key])

    const handleChangeMode = (m: any) => {
        setMode(m.id)
    }

    return (
        <div className="">
            <SwitchButton
                buttons={buttons}
                selected={mode}
                onChange={handleChangeMode}
            />


            <div className="flex justify-center pb-6">
                <Timer time={getDisplayTime()} />

            </div>

            <div className="flex justify-center">
                {isTimerRunning ? (
                    <Button text={"pause"} onClick={() => pause()} />
                ) : (
                    <Button text={"start"} onClick={() => {
                        start()
                        sound.play()
                    }} />
                )}
            </div>
        </div>
    )
}