export type SettingsContextType = {
  sessionTime: SessionDataMap;
  setSessionTime: (sessionTime: SessionDataMap) => void;
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

export type Settings = {
  sessions: {
    autoAdvance: boolean;
    focusTime: number;
    restTime: number;
    long_restTime: number;
  };

  sounds: {
    startEndSound: boolean;
    volume: number;
  };

  notifications: {
    timerCompleteNotification: boolean;
  };

  graphics: {
    turbulenceFilter: boolean;
    noiseFilter: boolean;
    wateringCanColor: string;
  };
};

export type SettingsSection = keyof Settings;

export type SettingsProviderProps = {
  children: string | JSX.Element | JSX.Element[];
};
