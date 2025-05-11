import { createContext, JSX, useState } from "react";
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
    const [devMode, setDevMode] = useState("focus")

    return (
        <DevContext.Provider value={{ devMode, setDevMode }}>
            {children}
        </DevContext.Provider>
    )
}

interface IDevOptionsProviderProps {
    children: string | JSX.Element | JSX.Element[]
}

export interface IDevOptions {
    devMode: string
    setDevMode: Function
}