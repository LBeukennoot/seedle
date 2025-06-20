import { createContext, useState, useEffect, JSX, useContext, useRef, useLayoutEffect } from "react";
import { ModeContext } from "./ModeProvider";
import { SettingsContext } from "./SettingsProvider";
import { NavigationContext } from "./NavigationProvider";
import { SessionContext } from "./SessionProvider";
import { Mode } from "../components/Modes";
import { DevContext } from "./DevProvider";

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

    const { mode, setMode } = useContext(ModeContext)
    const { sessionTime, sessionSettings } = useContext(SettingsContext)
    const { currentScreen } = useContext(NavigationContext)
    const { toNextSession, sessionsArray, setNextSession, currentSession } = useContext(SessionContext)
    const { devSettings } = useContext(DevContext)

    const [time, setTime] = useState(sessionTime[mode]?.time * 60);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const endTimeRef = useRef<number | null>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const pausedAtRef = useRef<number | null>(null);


    useEffect(() => {
        // if(isTimerRunning) {
        //     alert("are you sure?")
        //     setIsTimerRunning(false)
        // }
        //TODO add 'switching mode will stop timer' warning
        setIsTimerRunning(false)
        setTime(getDuration(mode))

    }, [mode, currentScreen, sessionSettings])

    useEffect(() => {
        const newMode = sessionsArray[currentSession];
        setMode(newMode);

        if (sessionSettings.autoAdvance) {
            const newTime = sessionTime[newMode]?.time * 60;
            setTime(newTime);

            // Delay start until state updates are done
            const timeout = setTimeout(() => {
                if (sessionSettings.autoStartFocus && newMode === Mode.FOCUS) start(newMode);
                if (sessionSettings.autoStartRest && (newMode === Mode.REST || newMode === Mode.LONG_REST)) start(newMode);
            }, 100); // small delay to let state settle

            return () => clearTimeout(timeout);
        } else {
            setTime(sessionTime[newMode]?.time * 60);
        }

        setNextSession(sessionsArray[currentSession + 1]);
    }, [currentSession]);


    const getDuration = (mode: Mode) => {
        const newTime = sessionTime[mode]?.time * 60
        if (!newTime || isNaN(newTime)) {
            console.error("Invalid mode or missing time for mode:", mode);
            return 0;
        }
        return newTime
    }

    const getDisplayTime = (): string => {
        if (typeof time !== 'number' || isNaN(time)) return "00:00";

        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);

        const minStr = minutes < 10 ? "0" + minutes : String(minutes);
        const secStr = seconds < 10 ? "0" + seconds : String(seconds);

        return `${minStr}:${secStr}`;
    }

    const onComplete = () => {
        console.log('timer complete');
        endTimeRef.current = null;
        clearInterval(intervalRef.current!);
        setIsTimerRunning(false);

        if (sessionSettings.autoAdvance) {
            toNextSession();
        }
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
                if (!devSettings.current.disableSound) {
                    soundEnd.play()
                }
            }
        }, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isTimerRunning]);


    const start = (mode: Mode) => {
        if (!devSettings.current.disableSound) {
            soundStart.play();
            soundEnd.pause()
            soundEnd.currentTime = 0
        }
        const newTime = sessionTime[mode]?.time;
        if (!newTime || isNaN(newTime)) {
            console.error("Invalid mode or missing time for mode:", mode);
            return;
        }

        const seconds = newTime * 60;
        setTime(seconds);
        endTimeRef.current = Date.now() + seconds * 1000;
        setIsTimerRunning(true);

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