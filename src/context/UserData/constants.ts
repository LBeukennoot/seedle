import type { UserStatistics } from "./types";

export const initialUserStatistics: UserStatistics = {
  total: {
    plants: 0,
    focusSessions: 0,
    restSessions: 0,
    longRestSessions: 0
  },
  unlockedCollectables: {},
  monthly: {}
};