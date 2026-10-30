export const formConfig: FormConfig = {
  sessions: [
    {
      name: 'autoAdvance',
      label: 'Auto Advance',
      type: 'toggle',
      value: 'autoAdvance',
      onChange: (newValue, updateState) => {
        updateState('sessions.autoAdvance', newValue);
      },
      info: 'When a session has finished, a new session will automatically start.'
    },
    {
      name: 'focusTime',
      label: 'Focus',
      type: 'slider',
      value: 'focusTime',
      onChange: (newValue, updateState) => {
        updateState('sessions.focusTime', newValue);
      },
      options: {
        min: 5,
        max: 60,
        safeZone: { min: 14, max: 47 },
        invert: true
      }
      // info: 'Duration of a focus session in minutes.'
    },
    {
      name: 'restTime',
      label: 'Rest',
      type: 'slider',
      value: 'restTime',
      onChange: (newValue, updateState) => {
        updateState('sessions.restTime', newValue);
      },
      options: {
        min: 5,
        max: 30,
        safeZone: { min: 3, max: 16 },
        invert: true
      }
      // info: 'Duration of a rest session in minutes.'
    },
    {
      name: 'long_restTime',
      label: 'Long Rest',
      type: 'slider',
      value: 'long_restTime',
      onChange: (newValue, updateState) => {
        updateState('sessions.long_restTime', newValue);
      },
      options: {
        min: 5,
        max: 60,
        safeZone: { min: 10, max: 45 },
        invert: true
      }
      // info: 'Duration of a long rest session in minutes.'
    }
  ],
  sounds: [
    {
      name: 'startEndSound',
      label: 'Start & End Sounds',
      type: 'toggle',
      value: 'startEndSound',
      onChange: (newValue, updateState) => {
        updateState('sounds.startEndSound', newValue);
      }
      // info: 'When a session has finished, a new session will automatically start.'
    },
    {
      name: 'volume',
      label: 'Volume',
      type: 'slider',
      value: 'volume',
      onChange: (newValue, updateState) => {
        updateState('sounds.volume', newValue);
      },
      options: {
        min: 0,
        max: 100,
        safeZone: { min: -1, max: 101 },
        invert: true
      }
      // info: 'Duration of a long rest session in minutes.'
    }
  ],

  notifications: [
    {
      name: 'timerCompleteNotification',
      label: 'Timer Complete',
      type: 'toggle',
      value: 'timerCompleteNotification',
      onChange: (newValue, updateState) => {
        updateState('notifications.timerCompleteNotification', newValue);
      },
      info: 'When a session has finished, a desktop notification is sent.'
    }
  ],

  graphics: [
    {
      name: 'turbulenceFilter',
      label: 'Turbulence Filter',
      type: 'toggle',
      value: 'turbulenceFilter',
      onChange: (newValue, updateState) => {
        updateState('graphics.turbulenceFilter', newValue);
      },
      info: 'A filter that breaks up the straight edges. Note: this may lower your FPS.'
    },
    {
      name: 'noiseFilter',
      label: 'Noise Filter',
      type: 'toggle',
      value: 'noiseFilter',
      onChange: (newValue, updateState) => {
        updateState('graphics.noiseFilter', newValue);
      },
      info: 'A filter that breaks up flat colors. Note: this may lower your FPS.'
    }
  ]
};
