import { createContext, useState, useEffect, JSX } from "react";

// @ts-ignore
export const TimerContext = createContext<ITimerOptions>();

/**
 * Providing currentScreen to all screen components
 * 
 * @author      LBeukennoot
 * @created     19-03-2025
 */
export default function TimerProvider({ children }: ITimerOptionsProviderProps) {

    const [startTime, setStartTime] = useState(0.1);
    // const [focusTime, setFocusTime] = useState(0.1);
    // const [restTime, setRestTime] = useState(0.1);
    // const [longRestTime, setLongRestTime] = useState(0.1);
    const [time, setTime] = useState(3);

    const [currentMode, setCurrentMode] = useState<Mode>(Mode.None)


    useEffect(() => {
        const date = new Date(0)
        console.log(date.toLocaleString('nl-NL', {timeZone: "CET"}))
        console.log(date.toJSON())
        date.setTime(date.getTime() + (30 * 60000))
        console.log(date.toLocaleString('nl-NL'))

        // const interval = setInterval(() => {
        //     console.log(new Date().getSeconds())
        // }, 1000)
        // return () => clearInterval(interval)
    }, [])

    // const [times, setTimes] = useState({
    //     focus: 25,
    //     rest: 5
    // })

    // useEffect(() => {
    //     // setTime(startTime * 60)
    // }, [])

    useEffect(() => {
        // updateTime()
        // const interval = setInterval(() => {

        //     updateTime()

        // }, 1000)

        // return () => clearInterval(interval)
    }, [currentMode])

    const getDisplayTime = (): string => {
        // @ts-ignore
        let minutes = parseInt(time / 60, 10);
        // @ts-ignore
        let seconds = parseInt(time % 60, 10);

        // @ts-ignore
        minutes = minutes < 10 ? "0" + minutes : minutes;
        // @ts-ignore
        seconds = seconds < 10 ? "0" + seconds : seconds;

        return minutes + ":" + seconds
    }

    const updateTime = () => {
        // setTime(inputTime => {

        //     const time = Math.floor(inputTime)
        //     switch (currentMode) {

        //         case (Mode.Focus):
        //             if (time < 1) {
        //                 alarm()
        //             }
        //             if (time >= 0) {
        //                 return time - 1
        //             } else return time


        //         case (Mode.Break):
        //             if (time >= 0) {
        //                 return time - 1
        //             } else return time


        //         case (Mode.None):
        //             return time


        //         default:
        //             return time


        //     }
        // })
    }

    const start = () => {
        setCurrentMode(Mode.Focus)
    }

    const pause = () => {
        setCurrentMode(Mode.None)
    }

    const stop = () => {
        setCurrentMode(Mode.None)
    }

    const alarm = () => {
        setCurrentMode(Mode.None)
        setTime(startTime * 60)
        // const alarmSound = new Audio('../../../ta-da.mp3')
        // alarmSound.play()
        // alert("time is up!")
    }

    return (
        <TimerContext.Provider value={{ time, setTime, currentMode, startTime, setStartTime, getDisplayTime, start, pause }}>
            <title>{getDisplayTime() + " left on your timer!"}</title>
            {children}
        </TimerContext.Provider>
    )
}

enum Mode {
    Focus = "Focus",
    Break = "Break",
    None = "None"
}

interface ITimerOptionsProviderProps {
    children: string | JSX.Element | JSX.Element[]
}

export interface ITimerOptions {
    time: number
    setTime: Function
    currentMode: Mode
    startTime: number
    setStartTime: Function
    getDisplayTime: Function
    start: Function
    pause: Function
}