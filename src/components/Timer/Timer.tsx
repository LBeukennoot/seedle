import { useTimer } from "../../context/Timer"
import type { TimerProps } from "./types"

export const Timer = ({ className }: TimerProps) => {

    const { getDisplayTime } = useTimer()

    const splitTime = getDisplayTime().split('')
    const seconds = { tens: splitTime[splitTime.length - 2], ones: splitTime[splitTime.length - 1] }
    const divider = splitTime[splitTime.length - 3]
    const minutes = { hundreds: splitTime[splitTime.length - 6], tens: splitTime[splitTime.length - 5], ones: splitTime[splitTime.length - 4] }

    return (
        <div className={"flex justify-center items-center text-white w-40 h-12 transition-all font-lexend select-none " + className}>
            {minutes.hundreds ? (
                <div>{minutes.hundreds}</div>
            ) : null}
            <div>{minutes.tens}</div>
            <div>{minutes.ones}</div>
            <div className="!md:w-7 mb-2">{divider}</div>
            <div>{seconds.tens}</div>
            <div>{seconds.ones}</div>
        </div>
    )
}