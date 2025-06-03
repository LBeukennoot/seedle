import { useState } from "react"
import SessionIcon from "./SessionIcon"

export default function SessionIcons() {
    const [session, setSession] = useState([
        {
            done: true
        },
        {
            done: false
        },
        {
            done: false
        },
    ])

    return (
        <div className="absolute -mt-4 grid grid-cols-3 w-full">
            <div className="flex justify-center gap-1">
                {session.map((s, key) => {
                    return (
                        <SessionIcon key={key} enabled={s.done} />
                    )
                })}
            </div>
        </div>
    )
}