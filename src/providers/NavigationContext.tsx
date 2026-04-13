import { createContext } from "react";
import type { INavigationOptions } from "./NavigationProvider";

// @ts-ignore
export const NavigationContext = createContext<INavigationOptions>();