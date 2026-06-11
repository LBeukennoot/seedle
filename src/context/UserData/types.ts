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

export type UserData = {
  growthPoints: number;
  experience: number;
};

export type EditState = 'OFF' | 'GROW' | 'PLANT';

export type UserDataContextType = {
  userData: UserData;
  setUserData: (data: UserData) => void;
  addGrowthPoints: (amount: number) => void;
  removeGrowthPoints: (amount: number) => void;
  addExperience: (amount: number) => void;
  removeExperience: (amount: number) => void;
  getExperienceTier: (xp: number) => string;
  editState: EditState;
  setEditState: (state: EditState) => void;
};
