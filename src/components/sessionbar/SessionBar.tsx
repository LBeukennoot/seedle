import { useContext } from "react"
import { SessionContext } from "../../providers/SessionProvider"
import { SettingsContext } from "../../providers/SettingsProvider"

export default function SessionBar() {
    const { currentSession, setCurrentSession, sessionsArray } = useContext(SessionContext)
    const { sessionTime } = useContext(SettingsContext)

    return (
        <div className="flex items-center px-2 gap-2 bg-blue text-white rounded-full relative" style={{ scrollbarWidth: "none" }}>
            <div
                className="absolute w-12 h-12 bg-white left-0 top-0 border-4 border-blue rounded-full transition-all"
                style={{ left: currentSession * 2.5 + "rem" }}
            >

            </div>

            {
                sessionsArray.map((s, key) => {
                    console.log(sessionTime)
                    return (
                        <div
                            className={"w-8 text-center text-lg z-10 transition-all cursor-pointer " + (key <= currentSession ? "text-light-blue" : "") + " " + (key === currentSession ? "!text-blue !cursor-default" : "")}
                            onClick={() => {
                                if (currentSession !== key) {
                                    setCurrentSession(key)
                                }
                            }}
                        >
                            {sessionTime[s].time}
                        </div>
                    )
                })
            }
        </div>
    )
}