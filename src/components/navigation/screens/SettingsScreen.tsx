import { useContext } from "react"
import Slider from "../../Slider"
import { SettingsContext } from "../../../providers/SettingsProvider"
import ToggleButton from "../../ToggleButton"

export default function SettingsScreen() {

    const { sessionTime, setSessionTime, sessionSettings, setSessionSettings } = useContext(SettingsContext)

    const handleSessionTimeChange = ({ newValue, mode }: { newValue: number, mode: string }) => {
        //TODO only setState when its different (preventing unessesary rerenders)
        setSessionTime({
            ...sessionTime,
            [mode]: {
                ...sessionTime[mode],
                time: newValue
            }
        })
    }

    const handleSessionChange = ({ newValue, setting }: any) => {
        setSessionSettings({
            ...sessionSettings,
            [setting]: newValue
        })
    }

    // const Section = ({ title, children }: any) => {
    //     return (
    //         <div>
    //             <h2 className="text-lg mb-3 font-bold">{title}</h2>
    //             <hr className="border-1 rounded-full text-light-blue"></hr>

    //             <div className="my-4 flex flex-col gap-4 mb-10">
    //                 {children}
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <div className="overflow-y-auto max-h-[25rem] rounded-b-[2.3rem] md:rounded-b-[1.4rem]">
            <h1 className="text-3xl mb-3">settings</h1>

            <div>
                <hr className="border-1 rounded-full text-light-blue"></hr>
                <h2 className="text-lg my-3 font-bold">time</h2>
                <hr className="border-1 rounded-full text-light-blue"></hr>

                <div className="my-4 flex flex-col gap-4 mb-10">
                    <div>
                        <h3 className="text-lg">focus</h3>
                        <Slider
                            min={5}
                            max={120}
                            safeZone={{
                                min: sessionTime.focus.min,
                                max: sessionTime.focus.max
                            }}
                            invert={true}
                            value={sessionTime.focus.time}
                            setValue={(newValue: number) => handleSessionTimeChange({ newValue, mode: "focus" })}
                            name={sessionTime.focus.id}
                        />
                    </div>

                    <div>
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
                            setValue={(newValue: number) => handleSessionTimeChange({ newValue, mode: "rest" })}
                            name={sessionTime.rest.id}
                        />
                    </div >

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
                            setValue={(newValue: number) => handleSessionTimeChange({ newValue, mode: "long_rest" })}
                            name={sessionTime.long_rest.id}
                        />
                    </div>
                </div>
            </div>



            <div>
                <hr className="border-1 rounded-full text-light-blue"></hr>
                <h2 className="text-lg my-3 font-bold">sessions</h2>
                <hr className="border-1 rounded-full text-light-blue"></hr>

                <div className="my-4 flex flex-col gap-4 mb-10">
                    <div>
                        <h3 className="text-lg pb-2">automatic sessions</h3>
                        <ToggleButton
                            checked={sessionSettings.autoAdvance}
                            setValue={(newValue: boolean) => handleSessionChange({ newValue, setting: "autoAdvance" })}
                        />
                    </div>

                    {/* <div className={"h-10 overflow-y-hidden pb-2 transition-all bg-blue w-full duration-300 " + (!sessionSettings.autoAdvance ? "!h-0 !pb-0" : "")}>
                    </div> */}

                    <div className={"h-[13rem] overflow-y-hidden transition-all duration-500 " + (!sessionSettings.autoAdvance ? "!h-0" : "")}>
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
                                setValue={(newValue: number) => handleSessionChange({ newValue, setting: "focusSessions" })}
                                name={"focusSessions"}
                                disabled={!sessionSettings.autoAdvance}
                            />
                        </div>

                        <div>
                            <h3 className="text-lg pb-2">auto start focus</h3>
                            <ToggleButton
                                checked={sessionSettings.autoStartFocus}
                                setValue={(newValue: boolean) => handleSessionChange({ newValue, setting: "autoStartFocus" })}
                                disabled={!sessionSettings.autoAdvance}
                            />
                        </div>

                        <div>
                            <h3 className="text-lg pb-2">auto start rest</h3>
                            <ToggleButton
                                checked={sessionSettings.autoStartRest}
                                setValue={(newValue: boolean) => handleSessionChange({ newValue, setting: "autoStartRest" })}
                                disabled={!sessionSettings.autoAdvance}
                            />
                        </div>
                    </div>
                </div>
            </div>


            <hr className="border-1 mb-3 rounded-full text-light-blue"></hr>
        </div >
    )
}