export default function Timer({ time }: TimerType) {

    const splitTime = time.split('')
    const seconds = { tens: splitTime[splitTime.length - 2], ones: splitTime[splitTime.length - 1] }
    const divider = splitTime[splitTime.length - 3]
    const minutes = { hundreds: splitTime[splitTime.length - 6], tens: splitTime[splitTime.length - 5], ones: splitTime[splitTime.length - 4] }

    return (
        <div>
            {/* <div className={"text-light-blue text-9xl flex justify-center"}>
                {time}

            </div> */}
            <div className="w-96 flex justify-center text-blue text-9xl [&>*]:w-18">
                {minutes.hundreds ? (
                    <div>{minutes.hundreds}</div>
                ) : null}
                <div>{minutes.tens}</div>
                <div>{minutes.ones}</div>
                <div className="!w-7">{divider}</div>
                <div>{seconds.tens}</div>
                <div>{seconds.ones}</div>
            </div>
        </div>
    )
}

type TimerType = {
    time: string
}