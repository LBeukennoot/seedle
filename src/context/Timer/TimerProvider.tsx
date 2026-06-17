import { useState, useEffect, useRef } from 'react';
import { TimerContext } from './TimerContext';
import { SwitchModeWarningPopup } from '../../components/Popup/SwitchModeWarningPopup/SwitchModeWarningPopup';
import { Plants } from '../../components/PlantElement/types';
import { RewardPopup } from '../../components/Popup/RewardPopup';
import type { TimerContextType, TimerProviderProps } from './types';
import { useSettings } from '../Settings';
import { useSession } from '../Session';
import { useNavigation } from '../Navigation';
import { useMode } from '../Mode';
import { Mode } from '../../features/session/sessionTypes';
import { usePlantData } from '../PlantData';
import { useUserData } from '../UserData';

const soundEnd = new Audio('../../assets/sounds/timer_end_extended_v3.wav');
const soundStart = new Audio('../../assets/sounds/begin_sound.wav');

/**
 * Providing currentScreen to all screen components
 *
 * @author      LBeukennoot
 * @created     19-03-2025
 */
export const TimerProvider = ({ children }: TimerProviderProps) => {
  const { mode, setMode } = useMode();
  const { sessionTime, sessionSettings } = useSettings();
  const { currentScreen, setPopup } = useNavigation();
  const { toNextSession, sessionsArray, setNextSession, currentSession } = useSession();
  const { createPlant } = usePlantData();
  const { addGrowthPoints } = useUserData();
  // const { debugSettings }: DebugContextType = useDebug()
  // console.log(sessionTime)

  const getDuration = (mode: Mode) => {
    const newTime = sessionTime[mode]?.time * 60;
    if (!newTime || isNaN(newTime)) {
      console.error('Invalid mode or missing time for mode: ', mode);
      return 0;
    }
    return newTime;
  };

  //TODO save time in localstorage if user closes tab unexpectedly (AND add warning when user closes tab when timer is still running)
  const [time, setTime] = useState(getDuration(mode));
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const endTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pausedAtRef = useRef<number | null>(null);
  const isAutoAdvanceRef = useRef(false);

  const start = (mode: Mode) => {
    if (sessionSettings.startEndSound) {
      soundStart.play();
      soundEnd.pause();
      soundEnd.currentTime = 0;
    }

    const newTime = getDuration(mode);
    if (!newTime || isNaN(newTime)) {
      console.error('Invalid mode or missing time for mode:', mode);
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

  useEffect(() => {
    if (!isTimerRunning && time >= getDuration(mode)) {
      setTime(getDuration(mode));
    }
  }, [currentScreen, sessionSettings]);

  useEffect(() => {
    if (isTimerRunning) {
      pause();
      setPopup(
        <SwitchModeWarningPopup
          ignore={() => {
            setIsTimerRunning(false);
            setTime(getDuration(mode));
            setPopup(undefined);
          }}
          cancel={() => {
            start(mode);
            setPopup(undefined);
          }}
        />
      );
    } else {
      setIsTimerRunning(false);
      setTime(getDuration(mode));
    }
  }, [mode]);

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
      isAutoAdvanceRef.current = false;
      return () => clearTimeout(timeout);
    } else {
      setTime(sessionTime[newMode]?.time * 60);
    }

    setNextSession(sessionsArray[currentSession + 1]);
  }, [
    currentSession,
    // sessionSettings.autoStartFocus,
    // sessionSettings.autoStartRest,
    sessionTime
    // sessionsArray,
    // setMode,
    // setNextSession
  ]);

  const getDisplayTime = (): string => {
    // const time = getDuration(mode)
    if (typeof time !== 'number' || isNaN(time)) return '00:00';

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    const minStr = minutes < 10 ? '0' + minutes : String(minutes);
    const secStr = seconds < 10 ? '0' + seconds : String(seconds);

    return `${minStr}:${secStr}`;
  };

  const onComplete = () => {
    console.log('timer complete');
    endTimeRef.current = null;
    clearInterval(intervalRef.current!);
    setIsTimerRunning(false);

    if (mode !== Mode.REST) {
      const plantValues = Object.values(Plants);
      const randomPlant = plantValues[Math.floor(Math.random() * plantValues.length)];

      createPlant({
        size: 0.05,
        name: randomPlant
      });

      setPopup(
        <RewardPopup
          reward={randomPlant}
          title={mode === Mode.FOCUS ? 'session complete!' : 'you completed a whole cycle!'}
          claim={() => {
            setPopup(undefined);
          }}
        />
      );
    }

    if (mode === Mode.FOCUS) {
      addGrowthPoints(2);
      //   const customEvent = new Event('sessionFocusComplete');
      //   window.dispatchEvent(customEvent);
    }

    if (sessionSettings.autoAdvance) {
      isAutoAdvanceRef.current = true;
      toNextSession();
    }
  };

  useEffect(() => {
    if (!isTimerRunning) return;

    //TODO figure out why timer start has a delay
    intervalRef.current = setInterval(() => {
      if (!endTimeRef.current) return;

      const diff = Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000));
      setTime(diff);

      if (diff <= 0) {
        onComplete();
      }

      if (diff <= 4) {
        if (sessionSettings.startEndSound) {
          soundEnd.play();
        }
      }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isTimerRunning, sessionSettings.startEndSound]);

  const value: TimerContextType = {
    time,
    getDisplayTime,
    start,
    pause,
    isTimerRunning
  };

  return (
    <TimerContext.Provider value={value}>
      <title>{getDisplayTime() + ' left on your timer!'}</title>
      {children}
    </TimerContext.Provider>
  );
};
