import type { JSX } from 'react';

export type UserDataProviderProps = {
  children: string | JSX.Element | JSX.Element[];
};

// export type Experience = {
//   COMMON: 0,
//   RARE: 40,
//   UNIQUE: 90,
//   BLESSED: 150,
//   DIVINE: 200
// }

export enum Experience {
  COMMON = 'COMMON',
  RARE = 'RARE',
  UNIQUE = 'UNIQUE',
  BLESSED = 'BLESSED',
  DIVINE = 'DIVINE'
}

type TiersType = {
  [tier: string]: {
    experienceThreshold: number;
    color: string;
  };
};

export const Tiers: TiersType = {
  [Experience.COMMON]: {
    experienceThreshold: 0,
    color: '#F3BACF'
  },
  [Experience.RARE]: {
    experienceThreshold: 40,
    color: '#FFDD80'
  },
  [Experience.UNIQUE]: {
    experienceThreshold: 90,
    color: '#FF8B72'
  },
  [Experience.BLESSED]: {
    experienceThreshold: 150,
    color: '#DB7CAD'
  },
  [Experience.DIVINE]: {
    experienceThreshold: 200,
    color: '#9C99F6'
  }
};

export type UserStatistics = {
  total: {
    plants: number;
    focusSessions: number;
    restSessions: number;
    longRestSessions: number;
  };
  monthly: Record<string, { focus: number; rest: number; long_rest: number }>;
};

// export type EditState = 'OFF' | 'GROW' | 'PLANT';

export type UserDataContextType = {
  userStatistics: UserStatistics;
  // setUserStatistics: (data: UserStatistics) => void;
  addTotalPlants: (amount: number) => void;
  // removeGrowthPoints: (amount: number) => void;
  addTotalFocusSessions: (amount: number) => void;
  // removeExperience: (amount: number) => void;
  // getExperienceTier: (xp: number) => string;
  // editState: EditState;
  // setEditState: (state: EditState) => void;
};
