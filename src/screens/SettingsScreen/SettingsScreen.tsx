import { AccordionDetails, Popover } from '@mui/material';
import { Accordion } from '../../components/Accordion';
import { Slider } from '../../components/Slider';
import { Toggle } from '../../components/Toggle';
import { useSettings } from '../../context/Settings';
import { AccordionSummary } from '../../components/Accordion/AccordionSummary';
import type { SessionData } from '../../features/session/sessionTypes';
import { SwitchButton } from '../../components/SwitchButton';
import { Dropdown } from '../../components/Dropdown';

/**
 * @author      LBeukennoot for Seedle
 * @created     20-04-2026
 */
export const SettingsScreen = () => {
  const { sessionTime, setSessionTime, settings, setSettings } = useSettings();

  const handleSessionTimeChange = ({ newValue, mode }: { newValue: number; mode: string }) => {
    setSessionTime({
      ...sessionTime,
      [mode]: {
        ...sessionTime[mode],
        time: newValue
      }
    });
  };

  const handleSessionChange = ({ newValue, category, setting }: any) => {
    setSettings({
      ...settings,
      [category]: { ...[category], [setting]: newValue }
    });
  };

  //TODO change categories
  //TODO add setting descriptions
  // TODO this
  return (
    <div className="flex flex-col h-full overflow-y-scroll pr-5" style={{ clipPath: 'inset(0)' }}>
      <h1 className="text-4xl font-bold text-green mb-5">Settings</h1>

      <h2 className="text-2xl font-bold text-green">graphics</h2>
      <div className="w-full flex justify-between items-center">
        <div className="flex items-end gap-3">
          <h2 className="text-xl font-semibold text-green">turbulence filter</h2>
          <div className="font-mono text-md font-bold text-green text-center border-2 border-green w-5 h-5 rounded-full mb-0.5 cursor-pointer">
            <div className="-mt-1">i</div>
          </div>
          {/* <Popover open>ba</Popover> */}
        </div>
        {/* <SwitchButton options={["on", "off"]} selected={"off"} onSelect={() => {}} /> */}
        {/* <Toggle setValue={() => {}}checked /> */}
        <Dropdown
          options={[
            { id: 'on', label: 'on' },
            { id: 'off', label: 'off' }
          ]}
          selected={'off'}
          onSelect={(selected) =>
            handleSessionChange({ newValue: selected, category: 'graphics', setting: 'turbulenceFilter' })
          }
        />
      </div>

      {/* <Accordion>
        <AccordionSummary>time</AccordionSummary>
        <AccordionDetails className="my-4 flex flex-col gap-4 mb-10">
          <div>
            {Object.entries(sessionTime).map(([key, data]) => {
              const modeData = data as SessionData
              return (
                <div key={key}>
                  <h3 className="text-lg">{key.replace('_', ' ')}</h3>
                  <Slider
                    min={5}
                    max={120}
                    safeZone={{
                      min: modeData.min,
                      max: modeData.max
                    }}
                    invert={true}
                    value={modeData.time}
                    setValue={(newValue: number) => handleSessionTimeChange({ newValue, mode: key })}
                    name={key}
                  />
                </div>
              );
            })}
          </div>

        </AccordionDetails>
      </Accordion> */}

      {/* <Accordion>
        <AccordionSummary>sessions</AccordionSummary>
        <AccordionDetails className="my-4 flex flex-col gap-4 mb-10">
          <div>
            <h3 className="text-lg pb-2">automatic sessions</h3>
            <Toggle
              checked={sessionSettings.autoAdvance}
              setValue={(newValue: boolean) => handleSessionChange({ newValue, setting: 'autoAdvance' })}
            />
          </div>

          <div
            className={
              'h-52 overflow-y-hidden transition-all duration-500 ' + (!sessionSettings.autoAdvance ? '!h-0' : '')
            }>
            <div>
              <h3 className="text-lg pb-2">sessions</h3>
              <Slider
                min={1}
                max={4}
                safeZone={{
                  min: 0,
                  max: 4.1
                }}
                invert={true}
                value={sessionSettings.focusSessions}
                setValue={(newValue: number) => handleSessionChange({ newValue, setting: 'focusSessions' })}
                name={'focusSessions'}
                disabled={!sessionSettings.autoAdvance}
              />
            </div>

            <div>
              <h3 className="text-lg pb-2">auto start focus</h3>
              <Toggle
                checked={sessionSettings.autoStartFocus}
                setValue={(newValue: boolean) => handleSessionChange({ newValue, setting: 'autoStartFocus' })}
                disabled={!sessionSettings.autoAdvance}
              />
            </div>

            <div>
              <h3 className="text-lg pb-2">auto start rest</h3>
              <Toggle
                checked={sessionSettings.autoStartRest}
                setValue={(newValue: boolean) => handleSessionChange({ newValue, setting: 'autoStartRest' })}
                disabled={!sessionSettings.autoAdvance}
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion> */}

      {/* <Accordion>
        <AccordionSummary>sound</AccordionSummary>
        <AccordionDetails className="my-4 flex flex-col gap-4 mb-10">
          <div>
            <h3 className="text-lg pb-2">start and end sounds</h3>
            <Toggle
              checked={sessionSettings.startEndSound}
              setValue={(newValue: boolean) => handleSessionChange({ newValue, setting: 'startEndSound' })}
            />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>notifications</AccordionSummary>
        <AccordionDetails className="my-4 flex flex-col gap-4 mb-10">
          <div>
            <h3 className="text-lg pb-2">desktop notifications</h3>
            <Toggle
              checked={sessionSettings.timerCompleteNotification}
              setValue={(newValue: boolean) => handleSessionChange({ newValue, setting: 'timerCompleteNotification' })}
            />
          </div>
        </AccordionDetails>
      </Accordion> */}

      {/* <hr className="border-1 mb-3 rounded-full text-light-blue"></hr> */}
    </div>
  );
};
