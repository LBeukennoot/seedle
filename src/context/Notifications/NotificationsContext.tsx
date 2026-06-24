import type { NotificationsContextType } from "./types";
import { createAppContext } from "../createAppContext";

export const { Context: NotificationsContext, useAppContext: useNotifications } =
    createAppContext<NotificationsContextType>();