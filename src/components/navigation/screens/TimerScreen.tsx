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

export default function TimerScreen() {

    const { mode, setMode } = useContext(ModeContext)
    const { getDisplayTime, start, pause, isTimerRunning } = useContext(TimerContext)
    const { expanded, setExpanded } = useContext(NavigationContext)

    //@ts-ignore
    const buttons: sessionTimeType[] = Object.keys(Modes).map((key: string) => Modes[key])

    const handleChangeMode = (m: any) => {
        setMode(m.id)
    }

    const [dragStart, setDragStart] = useState(0)

    // const handleMouseDown = (e: any) => {
    //     // e.preventDefault(); console.log(e)
    // }

    // const handleMouseUp = (e: any) => {
    //     // e.preventDefault(); console.log(e)
    // }

    const handleDragEnd = (e: any) => {
        setDragStart(e.clientY)
        console.log(e)
    }

    const handleDragStart = (e: any) => {
        console.log(e)

        if (e.clientY - dragStart < 0) {
            console.log("drag")
        }
    }

    return (
        <div className={expanded ? "inline-block" : "grid grid-cols-3 md:inline-block"}>
            <div className="hidden md:block">
                <SwitchButton
                    buttons={buttons}
                    selected={mode}
                    onChange={handleChangeMode}
                />
            </div>

            <div className="block md:hidden h-full">
                <Dropdown selected={mode} options={buttons} onSelect={handleChangeMode} />
            </div>

            <div className="flex-col md:pb-6 items-center">
                {/* <div className="flex justify-center md:pb-6 items-center"> */}
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

            {/* <div className="w-full flex md:hidden justify-center relative col-span-3">
                <div
                    draggable
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    className="absolute h-1.5 bg-blue w-20 mt-1.5 rounded-full"
                ></div>
            </div> */}
            {/* <div draggable onMouseDown={handleMouseDown} onDragStart={() => console.log('drag')} onClick={() => console.log('click')} onMouseUpCapture={handleMouseUp}>button</div> */}
        </div>
    )
}