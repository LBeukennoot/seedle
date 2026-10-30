import { Slider } from '../../components/Slider';
import { Toggle } from '../../components/Toggle';
import { useSettings } from '../../context/Settings';
import { Dropdown } from '../../components/Dropdown';
import { useState } from 'react';
import { Popover } from '../../components/Popover/Popover';
import { formConfig } from './formConfig';
import type { Settings } from '../../context/Settings/types';

/**
 * @author      LBeukennoot for Seedle
 * @created     20-04-2026
 */
export const SettingsScreen = () => {
  const { settings, setSettings } = useSettings();
  const [popoverStates, setPopoverStates] = useState<Record<string, { open: boolean; anchorEl: HTMLElement | null }>>(
    {}
  );

  const handlePopoverClick = (event: React.MouseEvent<HTMLElement>, buttonId: string) => {
    setPopoverStates({
      ...popoverStates,
      [buttonId]: {
        open: true,
        anchorEl: event.currentTarget
      }
    });
  };

  const handlePopoverClose = (buttonId: string) => {
    setPopoverStates({
      ...popoverStates,
      [buttonId]: {
        open: false,
        anchorEl: null
      }
    });
  };

  // const handleSessionTimeChange = ({ newValue, mode }: { newValue: number; mode: string }) => {
  //   setSessionTime({
  //     ...sessionTime,
  //     [mode]: {
  //       ...sessionTime[mode],
  //       time: newValue
  //     }
  //   });
  // };

  const handleSettingsChange = ({
    newValue,
    category,
    setting
  }: {
    newValue: boolean | number;
    category: string;
    setting: string;
  }) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category as keyof Settings],
        [setting]: newValue
      }
    });
  };

  const handleFieldChange = (field: any, value: boolean | number) => {
    field.onChange(value, (path: string, value: boolean | number) => {
      const keys = path.split('.');
      const lastKey = keys.pop()!;
      setSettings((prev) => {
        const newState = { ...prev };
        let current = newState;
        keys.forEach((key) => {
          if (!current[key as keyof Settings]) current[key as keyof Settings] = {} as never;
          current = current[key as keyof Settings] as never;
        });
        current[lastKey as keyof Settings] = value as never;
        return newState;
      });
    });
  };

  return (
    <div className="flex flex-col h-full overflow-y-scroll pr-5" style={{ clipPath: 'inset(0)' }}>
      <h1 className="text-4xl font-bold text-green mb-5">Settings</h1>

      {Object.entries(formConfig).map(([sectionKey, fields]) => {
        const sectionKeyTyped = sectionKey as keyof Settings;
        return (
          <div key={sectionKey} className='mb-10'>
            <h2 className="text-2xl font-bold text-green">{sectionKey}</h2>
            {fields.map((input) => {
              const { name, label, type, info, options } = input;

              const currentValue = settings[sectionKeyTyped][name as keyof Settings[typeof sectionKeyTyped]];
              return (
                <div key={label} className="w-full flex justify-between align-center mb-5">
                  <div className="flex items-end gap-3">
                    <h3 className="text-xl font-semibold text-green">{label.toLowerCase()}</h3>
                    {info && (
                      <>
                        <div
                          className="font-mono text-md font-bold text-green text-center border-2 border-green w-5 h-5 rounded-full mb-0.5 cursor-pointer"
                          onClick={(e) => handlePopoverClick(e, label)}>
                          <div className="-mt-1">i</div>
                        </div>
                        <Popover
                          id={label}
                          open={popoverStates[label]?.open || false}
                          anchorEl={popoverStates[label]?.anchorEl || null}
                          onClose={() => handlePopoverClose(label)}>
                          {info}
                        </Popover>
                      </>
                    )}
                  </div>
                  <div className='w-full max-w-90 flex justify-end'>
                    {type === 'toggle' && (
                      <Toggle
                        setValue={(newValue) => handleFieldChange(input, newValue)}
                        checked={currentValue as boolean}
                      />
                    )}
                    {type === 'slider' && (
                      <Slider
                        min={options.min}
                        max={options.max}
                        safeZone={options.safeZone}
                        invert={options.invert}
                        value={currentValue as number}
                        setValue={(newValue) => handleFieldChange(input, newValue)}
                        name={name}
                        // disabled={!settings.sessions.autoAdvance}
                      />
                    )}
                    {type === 'dropdown' && options && (
                      <Dropdown
                        options={options}
                        selected={currentValue ? 'on' : 'off'}
                        onSelect={(selected) => {
                          const newValue = selected === 'on';
                          handleSettingsChange({ newValue, category: sectionKey, setting: name });
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
