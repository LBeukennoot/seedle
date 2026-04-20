import type { TimerContextType } from "./types";
import { createAppContext } from "../createAppContext";

export const { Context: TimerContext, useAppContext: useTimer } =
    createAppContext<TimerContextType>();