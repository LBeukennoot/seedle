import type { SessionContextType } from "./types";
import { createAppContext } from "../createAppContext";

export const { Context: SessionContext, useAppContext: useSession } =
    createAppContext<SessionContextType>();