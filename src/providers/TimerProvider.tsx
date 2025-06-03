import { createContext, useState, useEffect, JSX, useContext, useRef } from "react";
import { ModeContext } from "./ModeProvider";
import { SettingsContext } from "./SettingsProvider";
import { NavigationContext } from "./NavigationProvider";
import { SessionContext } from "./SessionProvider";
import { Mode } from "../components/Modes";

const soundEnd = new Audio('../../assets/sounds/timer_end_extended_v3.wav')
const soundStart = new Audio('../../assets/sounds/begin_sound.wav')


// @ts-ignore
export const TimerContext = createContext<ITimerOptions>();

/**
 * Providing currentScreen to all screen components
 * 
 * @author      LBeukennoot
 * @created     19-03-2025
 */
export default function TimerProvider({ children }: ITimerOptionsProviderProps) {

    const { mode } = useContext(ModeContext)
    const { sessionTime, sessionSettings } = useContext(SettingsContext)
    const { currentScreen } = useContext(NavigationContext)
    const { toNextSession, nextSession } = useContext(SessionContext)

    const [time, setTime] = useState(sessionTime[mode]?.time * 60);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const endTimeRef = useRef<number | null>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const pausedAtRef = useRef<number | null>(null);


    // console.log(mode)

    useEffect(() => {
        setTime(sessionTime[mode]?.time * 60)
    }, [mode, currentScreen, sessionTime])

    const duration = () => {
        return sessionTime[mode]?.time * 60
    }

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

    const startIfAutoStartFocus = () => {

    }

    const onComplete = () => {
        setIsTimerRunning(false);
        endTimeRef.current = null;
        setTime(sessionTime[mode]?.time * 60)
        console.log('timer complete')
        clearInterval(intervalRef.current!);
        if (sessionSettings.autoAdvance) toNextSession()

        const timeout = setTimeout(() => {
            if (sessionSettings.autoStartFocus && nextSession === Mode.FOCUS) start()
            if (sessionSettings.autoStartRest && (nextSession === Mode.REST || nextSession === Mode.LONG_REST)) start()
            clearTimeout(timeout)
        }, 1500)

    }

    const soundTimer = () => {
        soundEnd.play()
    }

    useEffect(() => {
        if (!isTimerRunning) return;

        intervalRef.current = setInterval(() => {
            if (!endTimeRef.current) return;

            const diff = Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000));
            setTime(diff);

            if (diff <= 0) {
                onComplete()
            }

            if (diff <= 4) {
                soundTimer();
            }
        }, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isTimerRunning]);

    const start = () => {
        endTimeRef.current = Date.now() + time * 1000;
        setIsTimerRunning(true);
        soundStart.play()

        // Immediate update to prevent "double tick"
        const diff = Math.max(0, Math.floor((endTimeRef.current - Date.now()) / 1000));
        setTime(diff);
    };

    const pause = () => {
        if (isTimerRunning && endTimeRef.current) {
            pausedAtRef.current = Date.now();
            setIsTimerRunning(false);
        }
    };

    // const resume = () => {
    //     if (!isTimerRunning && pausedAtRef.current && endTimeRef.current) {
    //         const pauseDuration = Date.now() - pausedAtRef.current;
    //         endTimeRef.current += pauseDuration;
    //         setIsTimerRunning(true);
    //     }
    // };

    // const reset = () => {
    //     setIsTimerRunning(false);
    //     setTime(duration());
    //     endTimeRef.current = null;
    //     pausedAtRef.current = null;
    // };

    return (
        <TimerContext.Provider value={{ time, getDisplayTime, start, pause, isTimerRunning }}>
            <title>{getDisplayTime() + " left on your timer!"}</title>
            {children}
        </TimerContext.Provider>
    )
}

interface ITimerOptionsProviderProps {
    children: string | JSX.Element | JSX.Element[]
}

export interface ITimerOptions {
    time: number
    getDisplayTime: Function
    start: Function
    pause: Function
    isTimerRunning: boolean
}