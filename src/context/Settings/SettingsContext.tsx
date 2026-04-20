import type { SettingsContextType } from "./types";
import { createAppContext } from "../createAppContext";

export const { Context: SettingsContext, useAppContext: useSettings } =
    createAppContext<SettingsContextType>();