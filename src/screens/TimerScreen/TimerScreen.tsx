import { useTimer } from "../../context/Timer"
import { useSettings } from "../../context/Settings"
import { useSession } from "../../context/Session"
import { SwitchButton } from "../../components/SwitchButton"
import { Dropdown } from "../../components/Dropdown"
import { Timer } from "../../components/Timer"
import { SessionBar } from "../../components/SessionBar"
import { NextIcon, PauseIcon, StartIcon } from "../../components/Icons"
import { Button } from "../../components/Button"
import { Modes } from "../../components/Modes"
import { useMode } from "../../context/Mode"

export const TimerScreen = () => {

    const { mode, setMode } = useMode()
    const { getDisplayTime, start, pause, isTimerRunning } = useTimer()
    const { sessionSettings } = useSettings()
    const { toNextSession, nextSession } = useSession()


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
                        label={"pause"}
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
                        label={"start"}
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
                        label={"skip"}
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