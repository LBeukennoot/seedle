import type { UserDataContextType } from "./types";
import { createAppContext } from "../createAppContext";

export const { Context: UserDataContext, useAppContext: useUserData } =
    createAppContext<UserDataContextType>();