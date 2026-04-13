import { useContext } from "react"
import { TimerContext } from "../../../providers/TimerProvider"
import { SwitchButton } from "../../../components/SwitchButton/SwitchButton"
import { Modes, type SessionData } from "../../../components/Modes"
import { ModeContext } from "../../../providers/ModeProvider"
import { Dropdown } from "../../../components/Dropdown/Dropdown"
import { SessionContext } from "../../../providers/SessionProvider"
import { SettingsContext } from "../../../providers/SettingsProvider"
import { SessionBar } from "../../../components/SessionBar/SessionBar"
import { NextIcon, PauseIcon, StartIcon } from "../../../components/Icons"
import { Timer } from "../../../components/Timer"
import { Button } from "../../../components/Button"

export const TimerScreen = () => {

    const { mode, setMode } = useContext(ModeContext)
    const { getDisplayTime, start, pause, isTimerRunning } = useContext(TimerContext)
    const { sessionSettings } = useContext(SettingsContext)
    const { toNextSession, nextSession } = useContext(SessionContext)


    //@ts-ignore
    const options: SessionData[] = Object.keys(Modes).map((key: string) => Modes[key])

    const handleChangeMode = (m: any) => {
        setMode(m.id)
    }

    return (
        <div className={"flex flex-col select-none relative font-lexend"}>

            <div className="hidden card:block">
                <SwitchButton
                    options={options}
                    selected={mode}
                    onSelect={handleChangeMode}
                />
            </div>

            <div className="flex justify-center card:hidden h-full">
                <Dropdown selected={mode} options={options} onSelect={handleChangeMode} />
            </div>

            <div className="flex-col pb-6 items-center">
                <Timer time={getDisplayTime()} />
            </div>

            <div className="flex justify-center gap-2">

                {sessionSettings.autoAdvance && (
                    <div className="hidden card:inline-block">
                        <SessionBar />
                    </div>
                )}


                {isTimerRunning ? (
                    <Button
                        onClick={() => pause()}
                        className={!sessionSettings.autoAdvance ? "px-4" : ""}
                    >
                        {!sessionSettings.autoAdvance && "pause"}
                        {sessionSettings.autoAdvance && (
                            <PauseIcon className="fill-white" />
                        )}
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            start(mode)
                        }}
                        className={!sessionSettings.autoAdvance ? "px-4" : ""}
                    >
                        {!sessionSettings.autoAdvance && "start"}
                        {sessionSettings.autoAdvance && (
                            <StartIcon className="fill-white" />
                        )}
                    </Button>
                )}

                {sessionSettings.autoAdvance && (
                    <Button
                        onClick={() => {
                            toNextSession()
                        }}
                        className={"inline-block card:hidden"}
                    >
                        <div className="flex items-center gap-1.5 max-h-5">
                            <p className="hidden xs:block">skip </p><p className="flex items-center whitespace-nowrap"> to {nextSession}</p>
                            <NextIcon className="fill-white" />
                        </div>

                    </Button>
                )}
            </div>
        </div>
    )
}