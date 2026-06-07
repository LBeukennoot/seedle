import { createAppContext } from "../createAppContext";
import type { UserDataContextType } from "./types";

export const { Context: UserDataContext, useAppContext: useUserData } =
    createAppContext<UserDataContextType>();