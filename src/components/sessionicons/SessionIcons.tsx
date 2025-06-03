import { useContext, useState } from "react"
import SessionIcon from "./SessionIcon"
import { SettingsContext } from "../../providers/SettingsProvider"

export default function SessionIcons() {
    const { sessionSettings } = useContext(SettingsContext)
    const array = Array.apply(null, Array(sessionSettings.focusSessions)).map(function (x, i) { return i; })

    return (
        <div className="absolute -mt-4 grid grid-cols-3 w-full">
            <div className="flex justify-center gap-1">
                {array.map((s, key) => {
                    return (
                        <SessionIcon
                            key={key}
                            id={key}
                        />
                    )
                })}
            </div>
        </div>
    )
}