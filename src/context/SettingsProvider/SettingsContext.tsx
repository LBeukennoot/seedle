import { createContext } from "react";

export interface SettingsContextValue {
  backgroundAnimated: boolean;
  switchBackground: () => void;
}

export const SettingsContext = createContext<SettingsContextValue | null>(null);
