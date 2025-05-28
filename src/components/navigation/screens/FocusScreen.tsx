import { useContext, useState } from "react"
import { TimerContext } from "../../../providers/TimerProvider"
import SwitchButton from "../../SwitchButton/SwitchButton"
import Button from "../../Button"
import Timer from "../../Timer"
import { Modes, sessionTimeType } from "../../Modes"
import { ModeContext } from "../../../providers/ModeProvider"
import Dropdown from "../../dropdown/Dropdown"
import { NavigationContext } from "../../../providers/NavigationProvider"
const sound = new Audio('../../assets/sounds/begin_sound.wav')

export default function FocusScreen() {

    const { mode, setMode } = useContext(ModeContext)
    const { getDisplayTime, start, pause, isTimerRunning } = useContext(TimerContext)
    const { expanded, setExpanded } = useContext(NavigationContext)

    //@ts-ignore
    const buttons: sessionTimeType[] = Object.keys(Modes).map((key: string) => Modes[key])

    const handleChangeMode = (m: any) => {
        setMode(m.id)
    }

    // const handleMouseDown = (e: any) => {
    //     // e.preventDefault(); console.log(e)
    // }

    // const handleMouseUp = (e: any) => {
    //     // e.preventDefault(); console.log(e)
    // }

    return (
        <div className={expanded ? "inline-block" : "grid grid-cols-3 md:inline-block"}>
            <div className="hidden md:block">
                <SwitchButton
                    buttons={buttons}
                    selected={mode}
                    onChange={handleChangeMode}
                />
            </div>

            <div className="block md:hidden">
                <Dropdown selected={mode} options={buttons} onSelect={handleChangeMode} />
            </div>

            <div className="flex justify-center pb-6">
                <Timer time={getDisplayTime()} expanded={expanded} />
            </div>

            <div className="flex justify-center">
                {isTimerRunning ? (
                    <Button text={"pause"} onClick={() => pause()} expanded={expanded} />
                ) : (
                    <Button text={"start"} onClick={() => {
                        start()
                        sound.play()
                    }} expanded={expanded} />
                )}
            </div>

            {/* <div draggable onMouseDown={handleMouseDown} onDragStart={() => console.log('drag')} onClick={() => console.log('click')} onMouseUpCapture={handleMouseUp}>button</div> */}
        </div>
    )
}