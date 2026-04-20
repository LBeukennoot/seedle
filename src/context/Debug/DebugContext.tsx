import type { DebugContextType } from "./types";
import { createAppContext } from "../createAppContext";

export const { Context: DebugContext, useAppContext: useDebug } =
    createAppContext<DebugContextType>();