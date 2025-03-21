import { useContext, useState, useEffect } from "react"
import { NavigationContext } from "../../../providers/NavigationProvider"
import { TimerContext } from "../../../providers/TimerProvider"

export default function FocusScreen() {

    const { setCurrentScreen } = useContext(NavigationContext)
    const { currentMode, getDisplayTime, start, pause } = useContext(TimerContext)

    const [state, setState] = useState("focus")

    return (
        <div className="bg-green-800 w-screen h-screen">
            <div>
                focus
            </div>


            <div>
                {currentMode}
            </div>

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

            <div className="bg-white mx-auto max-w-xl">
                <div className="text-center py-6">
                    {getDisplayTime()}
                </div>
                <div className="flex [&>*]:m-2 justify-center">
                    <button 
                    className={(state === "focus" ? "bg-gray-500" : "bg-gray-950") + " text-white"}
                    onClick={() => setState("rest")}>Focus</button>
                    <button 
                    className={(state === "rest" ? "bg-gray-500" : "bg-gray-950") + " text-white"}
                    onClick={() => setState("focus")}>Rest</button>
                </div>
            </div>



            <div>
                <button onClick={() => setCurrentScreen("settings")}>go to settings</button>
            </div>
        </div>
    )
}