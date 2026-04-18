import { createContext, useState, useEffect, type JSX, useContext, useRef } from "react";
import { ModeContext } from "./ModeProvider";
import { SettingsContext } from "./SettingsProvider";
import { SessionContext } from "./SessionProvider";
import { Mode } from "../components/Modes";
import { NavigationContext } from "./NavigationContext";
import { useUserData } from "../context/UserData";
import { RewardPopup } from "../components/Popup/RewardPopup";
import { SwitchModeWarningPopup } from "../components/Popup/SwitchModeWarningPopup/SwitchModeWarningPopup";
import { Plants } from "../components/PlantElement/types";

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
    const { currentScreen, setPopup } = useContext(NavigationContext)
    const { toNextSession, sessionsArray, setNextSession, currentSession } = useContext(SessionContext)
    const { createPlant } = useUserData()
    // const { devSettings } = useContext(DevContext)

    const getDuration = (mode: Mode) => {
        const newTime = sessionTime[mode]?.time * 60
        if (!newTime || isNaN(newTime)) {
            console.error("Invalid mode or missing time for mode:", mode);
            return 0;
        }
        return newTime
    }

    const [time, setTime] = useState(getDuration(mode));
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const endTimeRef = useRef<number | null>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const pausedAtRef = useRef<number | null>(null);
    const isAutoAdvanceRef = useRef(false);



    useEffect(() => {
        if (!isTimerRunning && time >= getDuration(mode)) {
            setTime(getDuration(mode))
        }
    }, [currentScreen, sessionSettings])

    useEffect(() => {
        // if(isTimerRunning) {
        //     alert("are you sure?")
        //     setIsTimerRunning(false)
        // }
        //TODO add 'switching mode will stop timer' warning
        if (isTimerRunning) {
            pause()
            setPopup(
                <SwitchModeWarningPopup
                    ignore={() => {
                        setIsTimerRunning(false)
                        setTime(getDuration(mode))
                        setPopup(undefined)
                    }}
                    cancel={() => {
                        start(mode)
                        setPopup(undefined)
                    }}
                />
            )
        } else {
            setIsTimerRunning(false)
            setTime(getDuration(mode))
        }


    }, [mode])

    useEffect(() => {
        const newMode = sessionsArray[currentSession];
        setMode(newMode);

        if (isAutoAdvanceRef.current) {
            const newTime = sessionTime[newMode]?.time * 60;
            setTime(newTime);

            // Delay start until state updates are done
            const timeout = setTimeout(() => {
                if (sessionSettings.autoStartFocus && newMode === Mode.FOCUS) start(newMode);
                if (sessionSettings.autoStartRest && (newMode === Mode.REST || newMode === Mode.LONG_REST)) start(newMode);
            }, 100); // small delay to let state settle
            isAutoAdvanceRef.current = false
            return () => clearTimeout(timeout);
        } else {
            setTime(sessionTime[newMode]?.time * 60);
        }

        setNextSession(sessionsArray[currentSession + 1]);
    }, [currentSession]);




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

        if (mode !== Mode.REST) {

            const plantValues = Object.values(Plants);
            const randomPlant = plantValues[Math.floor(Math.random() * plantValues.length)];
            
            setPopup(
                <RewardPopup
                    reward={randomPlant}
                    title={mode === Mode.FOCUS ? "session complete!" : "you completed a whole cycle!"}
                    claim={() => {
                        console.log('creating new plant!')

                        createPlant({
                            size: 0.05,
                            name: randomPlant
                        })
                        // setPlants((prev: Plant[]) =>
                        //     [...prev, createPlant({
                        //         // id: prev.length + 1,
                        //         // gardenId: "A",
                        //         // x: 0.4,
                        //         // y: 0.3,
                        //         size: 0.05,
                        //         name: "CHIRARY"
                        //     })]
                        // )
                        setPopup(undefined)
                    }}
                />
            )
        }

        if (mode === Mode.FOCUS) {
            const customEvent = new Event('sessionFocusComplete')
            window.dispatchEvent(customEvent)
        }

        if (sessionSettings.autoAdvance) {
            isAutoAdvanceRef.current = true;
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
                if (sessionSettings.startEndSound) {
                    soundEnd.play()
                }
            }
        }, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isTimerRunning]);


    const start = (mode: Mode) => {
        if (sessionSettings.startEndSound) {
            soundStart.play()
            soundEnd.pause()
            soundEnd.currentTime = 0
        }

        const newTime = getDuration(mode);
        if (!newTime || isNaN(newTime)) {
            console.error("Invalid mode or missing time for mode:", mode);
            return;
        }

        if (time == newTime || time <= 0) {
            // reset time (if time is 0)
            setTime(newTime);
            endTimeRef.current = Date.now() + newTime * 1000;
        } else {
            // resume time (if there is still time left on timer)
            endTimeRef.current = Date.now() + time * 1000;
        }


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