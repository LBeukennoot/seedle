import { useContext, useState, useEffect } from "react"
import { NavigationContext } from "../../../providers/NavigationProvider"
import { TimerContext } from "../../../providers/TimerProvider"

export default function FocusScreen() {

    const { setCurrentScreen } = useContext(NavigationContext)
    const { currentMode, getDisplayTime, start, pause } = useContext(TimerContext)

    const [state, setState] = useState(false)

    return (
        <div className="w-screen h-screen bg-green">

            <div>
                <button onClick={() => start()}>
                    start time
                </button>
            </div>

            <div>
                <button onClick={() => pause()}>
                    pause time
                </button>
            </div>

            <div className="bg-white mx-auto py-6 max-w-xl rounded-3xl">
                <div className="flex justify-center pb-6">

                    <button className={"bg-blue w-40 h-10 items-center transition-all relative flex cursor-pointer rounded-lg"} onClick={() => setState(state => !state)}>
                        <div className={"bg-white opacity-25 rounded-md w-20 absolute transition-all top-0 h-full " + (state ? "left-0" : "left-20")}></div>
                        <div className="w-20 z-10 text-center select-none text-white">focus</div>
                        <div className="w-20 z-10 text-center select-none text-white">break</div>
                    </button>

                </div>

                <div className="text-center pb-6">
                    {getDisplayTime()}
                </div>

                <div className="flex justify-center">
                    <button className="bg-blue text-white px-4 py-2 rounded-lg cursor-pointer" onClick={() => start()}>
                        start
                    </button>
                </div>

            </div>


            <div>
                <button onClick={() => setCurrentScreen("settings")}>go to settings</button>
            </div>
        </div>
    )
}