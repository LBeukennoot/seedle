import { getSessionsArray } from "../../context/Session"
import type { SessionBarProps } from "./types"

export const SessionBar = ({ currentSession, setCurrentSession, sessionCount, sessionTime }: SessionBarProps) => {

    const sessionsArray = getSessionsArray(sessionCount)

    currentSession = Math.min(currentSession, (sessionCount * 2) - 1);

    return (
        <div className="flex px-2 gap-2 bg-blue text-white rounded-full relative font-lexend">
            <div
                className="absolute w-12 h-12 py-3 bg-white left-0 top-0 border-4 border-blue rounded-full transition-all z-10"
                style={{ left: currentSession * 2.5 + "rem" }}
            >

            </div>

            {
                sessionsArray.map((s, key) => {
                    return (
                        <div
                            key={key}
                            className="relative"
                            onClick={() => {
                                if (currentSession !== key) {
                                    setCurrentSession(key)
                                }
                            }}
                        >
                            <div
                                className={"relative w-8 h-12 flex justify-center items-center text-center text-lg cursor-pointer " + (key <= currentSession ? "text-light-blue z-20" : "") + " " + (key === currentSession ? "!text-blue !cursor-default" : "")}
                            >
                                {sessionTime[s].time}
                            </div>
                            {/* {currentSession !== key && <div className="absolute opacity-60 top-0 -left-2 w-12 h-12 border-[6px] hover:border-blue border-transparent rounded-full hover:bg-light-blue transition-all duration-150 cursor-pointer"></div>} */}
                        </div>
                    )
                })
            }
        </div>
    )
}