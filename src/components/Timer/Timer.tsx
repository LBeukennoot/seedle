import type { TimerProps } from "./types"

export const Timer = ({ time, className }: TimerProps) => {

    const splitTime = time.split('')
    const seconds = { tens: splitTime[splitTime.length - 2], ones: splitTime[splitTime.length - 1] }
    const divider = splitTime[splitTime.length - 3]
    const minutes = { hundreds: splitTime[splitTime.length - 6], tens: splitTime[splitTime.length - 5], ones: splitTime[splitTime.length - 4] }

    return (
        <div className={"flex h-full items-center text-blue  transition-all font-normal font-lexend " + className}>
            {/* // <div className={"flex justify-center text-blue [&>*]:w-18 transition-all " + (expanded ? "text-2xl w-16 font-semibold" : "text-2xl w-16 font-semibold md:font-normal md:w-96 md:text-9xl")}> */}
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