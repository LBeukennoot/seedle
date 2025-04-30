import { useContext, useState, useEffect } from "react"
import { NavigationContext } from "../../../providers/NavigationProvider"
import { TimerContext } from "../../../providers/TimerProvider"
import SwitchButton, { SwitchButtonButtonType } from "./SwitchButton"
import Button from "../../Button"

export default function FocusScreen() {

    const { setCurrentScreen } = useContext(NavigationContext)
    const { currentMode, getDisplayTime, start, pause } = useContext(TimerContext)

    const changeMode = (mode: SwitchButtonButtonType) => {
        console.log('change mode to ' + mode.name)
    }

    return (
        <div className="w-screen h-screen bg-light-green font-lexend">

            <div className="bg-white mx-auto py-6 max-w-xl rounded-3xl">

                <SwitchButton
                    buttons={[
                        { name: 'focus' },
                        { name: 'rest' },
                        { name: 'long rest' },
                    ]}
                    onChange={changeMode}
                />

                <div className="text-center pb-6">
                    {getDisplayTime()}
                </div>

                <div className="flex justify-center">
                    <Button text={"start"} onClick={() => start()}/>
                </div>

            </div>


            <div>
                <button onClick={() => setCurrentScreen("settings")}>go to settings</button>
            </div>
        </div>
    )
}