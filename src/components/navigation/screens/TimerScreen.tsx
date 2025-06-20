import { useContext } from "react"
import { TimerContext } from "../../../providers/TimerProvider"
import SwitchButton from "../../SwitchButton/SwitchButton"
import Button from "../../Button"
import Timer from "../../Timer"
import { Modes, sessionTimeType } from "../../Modes"
import { ModeContext } from "../../../providers/ModeProvider"
import Dropdown from "../../dropdown/Dropdown"
import { NavigationContext } from "../../../providers/NavigationProvider"
import SessionIcons from "../../sessionicons/SessionIcons"
import { DevContext } from "../../../providers/DevProvider"
import NextIcon from "../icons/NextIcon"
import { SessionContext } from "../../../providers/SessionProvider"


export default function TimerScreen() {

    const { mode, setMode } = useContext(ModeContext)
    const { getDisplayTime, start, pause, isTimerRunning } = useContext(TimerContext)
    const { expanded } = useContext(NavigationContext)
    const { devSettings } = useContext(DevContext)
    const { toNextSession } = useContext(SessionContext)

    //@ts-ignore
    const buttons: sessionTimeType[] = Object.keys(Modes).map((key: string) => Modes[key])

    const handleChangeMode = (m: any) => {
        setMode(m.id)
    }

    return (
        <div className={"grid grid-cols-3 md:inline-block select-none relative"}>

            <SessionIcons />

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
                        start(mode)
                    }} expanded={expanded} />
                )}

                <div
                    className="ml-3 flex justify-center items-center bg-blue rounded-full px-5 py-1 md:px-3 md:py-2 border-6 border-blue cursor-pointer hover:bg-light-blue transition-all"
                    onClick={() => toNextSession()}
                >
                    <NextIcon className="fill-white" />
                </div>
            </div>
        </div>
    )
}