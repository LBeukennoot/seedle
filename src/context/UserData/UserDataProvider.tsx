import { useEffect, useState } from 'react';
import { Experience, type UserData, type UserDataContextType, type UserDataProviderProps } from './types';
import { UserDataContext } from './UserDataContext';
import LocalStorage from '../../utils/LocalStorage';

const localStorage = new LocalStorage();

export const UserDataProvider = ({ children }: UserDataProviderProps) => {
  const [userData, setUserData] = useState<UserData>({
    growthPoints: 0,
    experience: 0
  });

  useEffect(() => {
    const stored = localStorage.getValue('userData');

    if (stored) {
      //   console.log(stored);
    } else {
      localStorage.setValue('userData', userData);
    }

    // console.log(stored);
  }, []);

  const addGrowthPoints = (amount: number = 1) => {
    setUserData({ ...userData, growthPoints: userData.growthPoints + amount });
  };

  const removeGrowthPoints = (amount: number = 1) => {
    setUserData({ ...userData, growthPoints: userData.growthPoints - amount });
  };

  const addExperience = (amount: number = 1) => {
    setUserData({ ...userData, experience: userData.experience + amount });
  };

  const removeExperience = (amount: number = 1) => {
    setUserData({ ...userData, experience: userData.experience - amount });
  };
  //TODO save data immediately, even before user actions

  // common, rare, unique, blessed, divine

function getExperienceTier(xp: number): keyof typeof Experience {
  const Tiers = Object.entries(Experience)
    .filter(([key, value]) => typeof value === 'number') as [string, number][];

  // Sort tiers from highest XP to lowest XP
  Tiers.sort((a, b) => b[1] - a[1]);

  // Find the first tier where the player's XP is >= the threshold
  const matchedTier = Tiers.find(([key, value]) => xp >= value);

  if (matchedTier) {
    // Return the string key (e.g., "RARE")
    return matchedTier[0] as keyof typeof Experience;
  }

  return 'COMMON';
}

//   console.log(getExperienceTier(41));
  // chirary: common
  // chamomile: rare
  // fireweed: divine
  // lavender: rare

  const value: UserDataContextType = {
    userData,
    setUserData,
    addGrowthPoints,
    removeGrowthPoints,
    addExperience,
    removeExperience,
    getExperienceTier
    // time,
    // getDisplayTime,
    // start,
    // pause,
    // isTimerRunning
  };

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
};
