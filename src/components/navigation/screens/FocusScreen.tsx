import { useContext, useState, useEffect } from "react"
import { NavigationContext } from "../../../providers/NavigationProvider"
import { TimerContext } from "../../../providers/TimerProvider"
import SwitchButton, { SwitchButtonButtonType } from "./../../SwitchButton"
import Button from "../../Button"
import Timer from "../../Timer"
import { Mode } from "../../Mode"
import { ModeContext } from "../../../providers/ModeProvider"

export default function FocusScreen() {

    const { setCurrentScreen } = useContext(NavigationContext)
    const { mode, setMode } = useContext(ModeContext)
    const { time, getDisplayTime, start, pause, isTimerRunning } = useContext(TimerContext)

    const changeMode = (mode: SwitchButtonButtonType) => {
        console.log('change mode to ' + mode)
    }

    return (
        <div className="py-10">
            <SwitchButton
                buttons={[Mode.FOCUS, Mode.REST, Mode.LONG_REST]}
                onChange={setMode}
            />


            <div className="flex justify-center pb-6">
                <Timer time={getDisplayTime()} />

            </div>

            <div className="flex justify-center">
                {isTimerRunning ? (
                    <Button text={"pause"} onClick={() => pause()} />
                ) : (
                    <Button text={"start"} onClick={() => start()} />
                )}
            </div>
        </div>
    )
}