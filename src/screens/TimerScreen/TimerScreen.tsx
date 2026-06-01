import { useTimer } from '../../context/Timer';
import { useSettings } from '../../context/Settings';
import { useSession } from '../../context/Session';
import { SwitchButton } from '../../components/SwitchButton';
import { Dropdown } from '../../components/Dropdown';
import { Timer } from '../../components/Timer';
import { SessionBar } from '../../components/SessionBar';
import { NextIcon, PauseIcon, StartIcon } from '../../components/Icons';
import { Button } from '../../components/Button';
import { useMode } from '../../context/Mode';
import { useEffect } from 'react';
import type { TimerContextType } from '../../context/Timer/types';
import type { SettingsContextType } from '../../context/Settings/types';
import type { SessionContextType } from '../../context/Session/types';
import { Modes } from '../../features/session/sessionModes';
import type { SessionData } from '../../features/session/sessionTypes';

/**
 * @author      LBeukennoot for Seedle
 * @created     20-04-2026
 */
export const TimerScreen = () => {
  const { mode, setMode } = useMode();
  const { getDisplayTime, start, pause, isTimerRunning }: TimerContextType = useTimer();
  const { sessionSettings, sessionTime }: SettingsContextType = useSettings();
  const {
    toNextSession,
    nextSession,
    currentSession,
    sessionsArray,
    setCurrentSession,
    sessionCount
  }: SessionContextType = useSession();

  const options = Object.keys(Modes);
  // const options = Object.entries(Modes).map(([mode, data]) => ({
  //     id: mode,
  //     name: mode.replace('_', ' '), // or a proper label map
  //     ...data
  // }))
  // const options: SessionData[] = Object.keys(Modes) as Mode[]
  // const options: SessionData[] = Object.keys(Modes).map((key: string) => Modes[key])

  const handleChangeMode = (mode: SessionData) => {
    setMode(mode);
  };

  // useEffect(() => {
  //     let nextSession = sessionsArray.findIndex((s, key) => {
  //         return s === mode && key >= currentSession
  //     })

  //     if (nextSession < 0 && mode === 'focus') nextSession = 0
  //     if (nextSession < 0 && mode === 'rest') nextSession = 1

  //     setCurrentSession(nextSession)
  // }, [mode])

  return (
    <div className={'flex h-full items-center justify-around'}>
    {/* <div className={'h-full flex items-center select-none font-lexend'}> */}
      <Dropdown selected={mode} options={options} onSelect={handleChangeMode} />
      {/* <Button label={'test'} onClick={() => {}}>
        focus
      </Button> */}

      <Timer time={getDisplayTime()} className={"text-3xl xs:text-6xl"} />

      <Button
        label={'start'}
        onClick={() => {
          start(mode);
        }}
        className={""}
        >
        {/* {!sessionSettings.autoAdvance && 'start'}
        {sessionSettings.autoAdvance && <StartIcon className="fill-white" />} */}
        <StartIcon className="fill-white" />
      </Button>

      {/* <div className="hidden card:block">
                <SwitchButton
                    options={options}
                    selected={mode}
                    onSelect={handleChangeMode}
                />
            </div>

            <div className="flex justify-center card:hidden h-full">
                <Dropdown selected={mode} options={options} onSelect={handleChangeMode} />
            </div>

            <div className="flex-col pb-6 items-center">
                <Timer time={getDisplayTime()} />
            </div>

            <div className="flex justify-center gap-2">

                {sessionSettings.autoAdvance && (
                    <div className="hidden card:inline-block">
                        <SessionBar currentSession={currentSession} setCurrentSession={setCurrentSession} sessionCount={sessionCount} sessionTime={sessionTime} />
                    </div>
                )}


                {isTimerRunning ? (
                    <Button
                        label={"pause"}
                        onClick={() => pause()}
                        className={!sessionSettings.autoAdvance ? "px-4" : ""}
                    >
                        {!sessionSettings.autoAdvance && "pause"}
                        {sessionSettings.autoAdvance && (
                            <PauseIcon className="fill-white" />
                        )}
                    </Button>
                ) : (
                    <Button
                        label={"start"}
                        onClick={() => {
                            start(mode)
                        }}
                        className={!sessionSettings.autoAdvance ? "px-4" : ""}
                    >
                        {!sessionSettings.autoAdvance && "start"}
                        {sessionSettings.autoAdvance && (
                            <StartIcon className="fill-white" />
                        )}
                    </Button>
                )}

                {sessionSettings.autoAdvance && (
                    <Button
                        label={"skip"}
                        onClick={() => {
                            toNextSession()
                        }}
                        className={"inline-block card:hidden"}
                    >
                        <div className="flex items-center gap-1.5 max-h-5">
                            <p className="hidden xs:block">skip </p><p className="flex items-center whitespace-nowrap"> to {nextSession}</p>
                            <NextIcon className="fill-white" />
                        </div>

                    </Button>
                )}
            </div> */}
    </div>
  );
};
