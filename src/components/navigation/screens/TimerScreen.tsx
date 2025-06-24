import { useContext } from "react"
import { TimerContext } from "../../../providers/TimerProvider"
import SwitchButton from "../../SwitchButton/SwitchButton"
import Button from "../../Button"
import Timer from "../../Timer"
import { Modes, sessionTimeType } from "../../Modes"
import { ModeContext } from "../../../providers/ModeProvider"
import Dropdown from "../../dropdown/Dropdown"
import { NavigationContext } from "../../../providers/NavigationProvider"
import SessionIcons from "../../sessionbar/SessionBar"
import { DevContext } from "../../../providers/DevProvider"
import NextIcon from "../icons/NextIcon"
import { SessionContext } from "../../../providers/SessionProvider"
import StartIcon from "../icons/StartIcon"
import PauseIcon from "../icons/PauseIcon"
import { SettingsContext } from "../../../providers/SettingsProvider"
import SessionBar from "../../sessionbar/SessionBar"


export default function TimerScreen() {

    const { mode, setMode } = useContext(ModeContext)
    const { getDisplayTime, start, pause, isTimerRunning } = useContext(TimerContext)
    const { expanded } = useContext(NavigationContext)
    const { devSettings } = useContext(DevContext)
    const { sessionTime, sessionSettings } = useContext(SettingsContext)
    const { toNextSession, sessionsArray, currentSession, setCurrentSession, nextSession } = useContext(SessionContext)


    //@ts-ignore
    const buttons: sessionTimeType[] = Object.keys(Modes).map((key: string) => Modes[key])

    const handleChangeMode = (m: any) => {
        setMode(m.id)
    }

    return (
        <div className={"flex flex-col select-none relative"}>

            <div className="hidden card:block">
                <SwitchButton
                    buttons={buttons}
                    selected={mode}
                    onChange={handleChangeMode}
                />
            </div>

            <div className="flex justify-center card:hidden h-full">
                <Dropdown selected={mode} options={buttons} onSelect={handleChangeMode} />
            </div>

            <div className="flex-col pb-6 items-center">
                <Timer time={getDisplayTime()} expanded={expanded} />
            </div>

            <div className="flex justify-center gap-2">

                <div className="hidden card:inline-block">
                    <SessionBar />
                </div>

                {isTimerRunning ? (
                    <Button onClick={pause} expanded={expanded} >
                        <PauseIcon className="fill-white" />
                    </Button>
                ) : (
                    <Button onClick={() => {
                        start(mode)
                    }} expanded={expanded} >
                            <StartIcon className="fill-white" />
                    </Button>
                )}

                <Button
                    onClick={() => {
                        toNextSession()
                    }}
                    expanded={expanded}
                    className={"inline-block card:hidden"}
                >
                    <div className="flex items-center gap-1.5 max-h-5">
                        <p className="hidden xs:block">skip </p><p className="flex items-center whitespace-nowrap"> to {nextSession}</p>
                        <NextIcon className="fill-white" />
                    </div>

                </Button>


                {/* <div
                    className="ml-3 flex justify-center items-center bg-blue rounded-full px-5 py-1 md:px-3 md:py-2 border-6 border-blue cursor-pointer hover:bg-light-blue transition-all"
                    onClick={() => toNextSession()}
                >
                    <NextIcon className="fill-white" />
                </div> */}
            </div>
        </div>
    )
}