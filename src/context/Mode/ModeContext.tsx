import type { ModeContextType } from "./types";
import { createAppContext } from "../createAppContext";

export const { Context: ModeContext, useAppContext: useMode } =
    createAppContext<ModeContextType>();