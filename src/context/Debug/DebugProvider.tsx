import { useEffect, useMemo, useState } from "react";
import URLParams from "../../utils/URLParams";
import { DebugContext } from "./DebugContext";
import type { DebugContextType, DebugProviderProps, DebugSettings } from "./types";


const urlParams = new URLParams();

export const DebugProvider = ({ children }: DebugProviderProps) => {
    const [debugSettings, setDebugSettings] = useState<DebugSettings>({
        debug: false,
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
    });

    useEffect(() => {
        const parsers = {
            debug: (v: string) => v === "true",
            disableSound: (v: string) => v === "true",
            focusTime: (v: string) => parseFloat(v),
            restTime: (v: string) => parseFloat(v),
            longRestTime: (v: string) => parseFloat(v),
            autoAdvance: (v: string) => v === "true",
            autoStartFocus: (v: string) => v === "true",
            autoStartRest: (v: string) => v === "true",
            focusSessions: (v: string) => parseInt(v),
        } as const;

        const next: Partial<DebugSettings> = {};

        // parsed values
        (Object.keys(parsers) as (keyof typeof parsers)[]).forEach((key) => {
            const raw = urlParams.getParam(key);
            if (typeof raw === "string") {
                next[key] = parsers[key](raw) as any;
            }
        });

        // plain string values
        const screen = urlParams.getParam("screen");
        const mode = urlParams.getParam("mode");

        if (typeof screen === "string") next.screen = screen;
        if (typeof mode === "string") next.mode = mode;

        setDebugSettings((prev) => ({
            ...prev,
            ...next,
        }));
    }, []);

    const value = useMemo<DebugContextType>(
        () => ({
            debugSettings,
            urlParams,
        }),
        [debugSettings, urlParams]
    );

    // console.log(value)

    return (
        <DebugContext.Provider value={value}>
            {children}
        </DebugContext.Provider>
    );
}