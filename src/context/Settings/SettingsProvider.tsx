import { useEffect, useState } from 'react';
import type { Settings, SettingsContextType, SettingsProviderProps } from './types';
import LocalStorage from '../../utils/LocalStorage';
import { SettingsContext } from './SettingsContext';
import { useDebug } from '../Debug';
import type { SessionDataMap } from '../../features/session/sessionTypes';
import { isSessionTimeType, Modes } from '../../features/session/sessionModes';

const localStorage = new LocalStorage();

/**
 * Providing currentScreen to all screen components
 *
 * @author      LBeukennoot
 * @created     02-05-2025
 */
export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const { debugSettings } = useDebug();

  const [sessionTime, setSessionTime] = useState<SessionDataMap>(Modes);

  const initialSettings = {
    sessions: {
      autoAdvance: false
    },

    sounds: {
      startEndSound: true,
      volume: 0
    },

    notifications: {
      timerCompleteNotification: true
    },

    graphics: {
      turbulenceFilter: true,
      noiseFilter: true,
      wateringCanColor: 'bg-yellow'
    }
  };
  const [settings, setSettings] = useState<Settings>((): Settings => {
    const stored = localStorage.getValue('settings');
    return stored ? (stored as Settings) : initialSettings;
  });

  useEffect(() => {
    localStorage.setValue('settings', settings);
  }, [settings]);

  /**
   * settings needed:
   *
   * SESSIONS
   * - auto advance to next session
   * - session length times for focus, rest, long_rest
   *
   * SOUND
   * - toggle sounds
   * - sound volume controls
   *
   * NOTIFICATIONS
   * - notification for when timer is done
   *
   * GRAPHICS
   * - toggle turbulence filter
   * - toggle noise filter
   * - (optional) watering can color
   *
   * DATA
   * - export data
   * - import data
   * - display of current app version
   */

  const handleSetSessionTime = (value: SessionDataMap) => {
    localStorage.setValue('sessionTimes', value);
    setSessionTime(value);
  };

  const handleSetSettings = (value: Settings) => {
    localStorage.setValue('settings', value);
    setSettings(value);
  };

  //   useEffect(() => {
  //     const newSessionTime = localStorage.getValue('sessionTimes') as SessionDataMap | undefined;
  //     // const newSessionTime = {focus: {id: 1, time: 5, max: 2, min: 3}, rest: {id: 1, time: 5, max: 2, min: 3}, long_rest: {id: 1, time: 5, max: 2, min: 3}}

  //     debugSettings.debug && console.log(newSessionTime);

  //     if (newSessionTime) {
  //       if (!isSessionTimeType(newSessionTime)) {
  //         console.error('Local storage value of "sessionTimes" is corrupted.');
  //         return;
  //       }

  //       setSessionTime(newSessionTime);
  //     }

  //     // applying devsettings (only if they are provided)
  //     setSessionTime((value) => {
  //       return {
  //         ...value,
  //         focus: {
  //           ...value.focus,
  //           time: debugSettings.focusTime ? debugSettings.focusTime : value.focus.time
  //         },
  //         rest: {
  //           ...value.rest,
  //           time: debugSettings.restTime ? debugSettings.restTime : value.rest.time
  //         },
  //         long_rest: {
  //           ...value.long_rest,
  //           time: debugSettings.longRestTime ? debugSettings.longRestTime : value.long_rest.time
  //         }
  //       };
  //     });

  //     const newSettings = localStorage.getValue('settings') as Settings;

  //     if (newSettings) setSettings(newSettings);

  //     // applying devsettings (only if they are provided)
  //     setSettings((prev) => {
  //       return {
  //         ...prev,
  //         autoAdvance: debugSettings.autoAdvance ?? prev.autoAdvance,
  //         autoStartFocus: debugSettings.autoStartFocus ?? prev.autoStartFocus,
  //         autoStartRest: debugSettings.autoStartRest ?? prev.autoStartRest,
  //         focusSessions: debugSettings.focusSessions ?? prev.focusSessions,
  //         startEndSound: debugSettings.disableSound !== undefined ? !debugSettings.disableSound : prev.startEndSound
  //       };
  //     });
  //   }, [debugSettings]);

  const value: SettingsContextType = {
    sessionTime,
    setSessionTime: handleSetSessionTime,
    settings,
    setSettings: handleSetSettings
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
