import { createContext } from "react";

export interface DebugContextValue {
    debugMode: boolean;
    backgroundAnimatedDebug: boolean | undefined;
    //   switchBackground: () => void;
}

export const DebugContext = createContext<DebugContextValue | null>(null);
