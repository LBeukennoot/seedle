import type { NavigationContextType } from "./types";
import { createAppContext } from "../createAppContext";

export const { Context: NavigationContext, useAppContext: useNavigation } =
    createAppContext<NavigationContextType>();