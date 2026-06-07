import { AccordionDetails } from '@mui/material';
import { Accordion } from '../../components/Accordion';
import { Slider } from '../../components/Slider';
import { Toggle } from '../../components/Toggle';
import { useSettings } from '../../context/Settings';
import { AccordionSummary } from '../../components/Accordion/AccordionSummary';
import type { SessionData } from '../../features/session/sessionTypes';

/**
 * @author      LBeukennoot for Seedle
 * @created     20-04-2026
 */
export const SettingsScreen = () => {
  const { sessionTime, setSessionTime, sessionSettings, setSessionSettings } = useSettings();

  const handleSessionTimeChange = ({ newValue, mode }: { newValue: number; mode: string }) => {
    //TODO only setState when its different (preventing unessesary rerenders)
    setSessionTime({
      ...sessionTime,
      [mode]: {
        ...sessionTime[mode],
        time: newValue
      }
    });
  };

  const handleSessionChange = ({ newValue, setting }: any) => {
    setSessionSettings({
      ...sessionSettings,
      [setting]: newValue
    });
  };

  return (
    <div className="overflow-y-auto max-h-full pt-10 rounded-b-[2.3rem] md:rounded-b-[1.4rem] text-blue font-lexend">
      <h1 className="text-3xl mb-3">settings</h1>

      <Accordion>
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

          {/* <div>
            <h3 className="text-lg">rest</h3>
            <Slider
              min={5}
              max={120}
              safeZone={{
                min: sessionTime.rest.min,
                max: sessionTime.rest.max
              }}
              invert={true}
              value={sessionTime.rest.time}
              setValue={(newValue: number) => handleSessionTimeChange({ newValue, mode: 'rest' })}
              name={sessionTime.rest.id}
            />
          </div>

          <div>
            <h3 className="text-lg">long rest</h3>
            <Slider
              min={5}
              max={120}
              safeZone={{
                min: sessionTime.long_rest.min,
                max: sessionTime.long_rest.max
              }}
              invert={true}
              value={sessionTime.long_rest.time}
              setValue={(newValue: number) => handleSessionTimeChange({ newValue, mode: 'long_rest' })}
              name={sessionTime.long_rest.id}
            />
          </div> */}
        </AccordionDetails>
      </Accordion>

      {/* <hr className="border rounded-full text-light-blue"></hr>
                <h2 className="text-lg my-3 font-bold">time</h2>
                <hr className="border rounded-full text-light-blue"></hr> */}

      <Accordion>
        <AccordionSummary>sessions</AccordionSummary>
        <AccordionDetails className="my-4 flex flex-col gap-4 mb-10">
          <div>
            <h3 className="text-lg pb-2">automatic sessions</h3>
            <Toggle
              checked={sessionSettings.autoAdvance}
              setValue={(newValue: boolean) => handleSessionChange({ newValue, setting: 'autoAdvance' })}
            />
          </div>

          {/* <div className={"h-10 overflow-y-hidden pb-2 transition-all bg-blue w-full duration-300 " + (!sessionSettings.autoAdvance ? "!h-0 !pb-0" : "")}>
                    </div> */}

          <div
            className={
              'h-[13rem] overflow-y-hidden transition-all duration-500 ' + (!sessionSettings.autoAdvance ? '!h-0' : '')
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
      </Accordion>

      <Accordion>
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

      {/* <hr className="border-1 mb-3 rounded-full text-light-blue"></hr> */}
    </div>
  );
};
