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
            mode: ""
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
    }
}

type handleSetDevSettings = {
    paramName: string
    value?: Function
}