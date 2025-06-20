import { createContext, JSX, useEffect, useRef, useState } from "react";
import URLParams from "../utils/URLParams";



// @ts-ignore
export const DevContext = createContext<IDevOptions>();
const urlParams = new URLParams()

/**
 * Providing dev settings to all screen components
 * 
 * @author      LBeukennoot
 * @created     10-05-2025
 */
export default function DevProvider({ children }: IDevOptionsProviderProps) {
    const devSettings = useRef(
        {
            dev: false,
            screen: "",
            mode: "",
            disableSound: undefined,
            focusTime: undefined,
            restTime: undefined,
            longRestTime: undefined,
            autoAdvance: undefined,
            autoStartFocus: undefined,
            autoStartRest: undefined,
            focusSessions: undefined,
        }
    )
    // const [devSettings, setDevSettings] = useState(
    //     {
    //         dev: false,
    //         screen: "",
    //         mode: ""
    //     }
    // )




    useEffect(() => {
        const handleSetDevSettings = ({ paramName, value }: handleSetDevSettings) => {
            const param = urlParams.getParam(paramName)
            if (typeof param === "string") devSettings.current = { ...devSettings.current, [paramName]: value ? value(param) : param }
        }
        // const handleSetDevSettings = ({ paramName, value }: handleSetDevSettings) => {
        //     const param = urlParams.getParam(paramName)
        //     console.log(devSettings)
        //     if (typeof param === "string") setDevSettings({ ...devSettings, [paramName]: value ? value(param) : param })
        // }

        handleSetDevSettings({ paramName: "dev", value: (v: any) => { return v === "true" } })
        handleSetDevSettings({ paramName: "mode" })
        handleSetDevSettings({ paramName: "screen" })
        handleSetDevSettings({ paramName: "disableSound", value: (v: any) => { return v === "true" } })
        handleSetDevSettings({ paramName: "focusTime", value: (v: any) => { return parseFloat(v) } })
        handleSetDevSettings({ paramName: "restTime", value: (v: any) => { return parseFloat(v) } })
        handleSetDevSettings({ paramName: "longRestTime", value: (v: any) => { return parseFloat(v) } })
        handleSetDevSettings({ paramName: "autoAdvance", value: (v: any) => { return v === "true" } })
        handleSetDevSettings({ paramName: "autoStartFocus", value: (v: any) => { return v === "true" } })
        handleSetDevSettings({ paramName: "autoStartRest", value: (v: any) => { return v === "true" } })
        handleSetDevSettings({ paramName: "focusSessions", value: (v: any) => { return parseInt(v) } })

        console.log(devSettings.current)


    }, [urlParams, devSettings])


    return (
        <DevContext.Provider value={{ devSettings: devSettings, urlParams }}>
            {children}
        </DevContext.Provider>
    )
}

interface IDevOptionsProviderProps {
    children: string | JSX.Element | JSX.Element[]
}

export interface IDevOptions {
    devSettings: DevSettingsType
    urlParams: Object
}

type DevSettingsType = {
    current: {
        dev: boolean
        screen: string
        mode: string
        disableSound: boolean | undefined
        focusTime: number | undefined
        restTime: number | undefined
        longRestTime: number | undefined
        autoAdvance: boolean | undefined
        autoStartFocus: boolean | undefined
        autoStartRest: boolean | undefined
        focusSessions: number | undefined
    }
}

type handleSetDevSettings = {
    paramName: string
    value?: Function
}