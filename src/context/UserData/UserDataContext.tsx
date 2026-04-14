import { createContext } from "react";
import type { UserData } from "./types";

export const UserDataContext = createContext<UserData>({rewards: [], setRewards: () => {}})