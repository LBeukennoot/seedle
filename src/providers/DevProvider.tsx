import { createContext, JSX, useEffect, useState } from "react";
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
    const [devSettings, setDevSettings] = useState(
        {
            screen: "",
            mode: ""
        }
    )


    useEffect(() => {

        const screenParam = urlParams.getParam("screen")
        if (typeof screenParam === "string") setDevSettings({ ...devSettings, screen: screenParam })

        const modeParam = urlParams.getParam("mode")
        if (typeof modeParam === "string") setDevSettings({ ...devSettings, mode: modeParam })


    }, [urlParams])


    return (
        <DevContext.Provider value={{ devSettings, setDevSettings, urlParams }}>
            {children}
        </DevContext.Provider>
    )
}

interface IDevOptionsProviderProps {
    children: string | JSX.Element | JSX.Element[]
}

export interface IDevOptions {
    devSettings: DevSettingsType
    setDevSettings: Function
    urlParams: Object
}

type DevSettingsType = {
    screen: string
    mode: string
}