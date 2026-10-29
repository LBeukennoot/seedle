import type { Dispatch, JSX, SetStateAction } from 'react';
import type { CollectableItem } from '../../collections/generated/types';
import type { Mode } from '../../features/session/sessionTypes';

export type UserDataProviderProps = {
  children: string | JSX.Element | JSX.Element[];
};

export interface UnlockedCollectableRecord {
  unlockedAt: number;
}

export type UserStatistics = {
  total: {
    plants: number;
    focusSessions: number;
    restSessions: number;
    longRestSessions: number;
  };
  unlockedCollectables: Record<string, UnlockedCollectableRecord>;
  monthly: Record<string, { focus: number; rest: number; long_rest: number }>;
};

// export type SessionType = 'focus' | 'rest' | 'long_rest';

export type UserDataContextType = {
  userStatistics: UserStatistics;
  setUserStatistics: Dispatch<SetStateAction<UserStatistics>>;
  /** Increments total plant count and evaluates new collectables */
  addPlant: (amount?: number, onUnlock?: (unlocked: CollectableItem[]) => void) => void;
  /** Logs completed focus, rest, or long rest sessions */
  addSession: (type: Mode) => void;
  saveUserData: () => void;
  /** Manually evaluates thresholds against collectables */
  checkCollectablesMilestones: (
    onUnlock?: (unlocked: CollectableItem[]) => void
  ) => void;
};