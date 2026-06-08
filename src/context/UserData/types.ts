import type { JSX } from "react";

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
  COMMON = 0,
  RARE = 40,
  UNIQUE = 90,
  BLESSED = 150,
  DIVINE = 200
}

export type UserData = {
  growthPoints: number;
  experience: number;
};

export type UserDataContextType = {
  userData: UserData;
  setUserData: (data: UserData) => void;
  addGrowthPoints: (amount: number) => void
  removeGrowthPoints: (amount: number) => void
  addExperience: (amount: number) => void
  removeExperience: (amount: number) => void
  getExperienceTier: (xp: number) => string
};
