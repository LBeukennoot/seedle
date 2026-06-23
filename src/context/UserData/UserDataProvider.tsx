import { useEffect, useState } from 'react';
import {
  Experience,
  Tiers,
  type EditState,
  type UserData,
  type UserDataContextType,
  type UserDataProviderProps
} from './types';
import { UserDataContext } from './UserDataContext';
import LocalStorage from '../../utils/LocalStorage';

const localStorage = new LocalStorage();

export const UserDataProvider = ({ children }: UserDataProviderProps) => {
  const [editState, setEditState] = useState<EditState>('OFF');
  const [userData, setUserData] = useState<UserData>({
    growthPoints: 0,
    experience: 0
  });

  // useEffect(() => {
  //   if (userData.growthPoints <= 0) setEditState('OFF');
  // }, [editState, userData.growthPoints]);

  useEffect(() => {
    const stored = localStorage.getValue('userData');

    //TODO also save data when its being changed
    if (stored) {
      setUserData(stored as UserData);
    } else {
      localStorage.setValue('userData', userData);
    }
  }, []);

  const addGrowthPoints = (amount: number = 1) => {
    setUserData({ ...userData, growthPoints: userData.growthPoints + amount });
  };

  const removeGrowthPoints = (amount: number = 1) => {
    if (userData.growthPoints > 0) setUserData({ ...userData, growthPoints: userData.growthPoints - amount });
  };

  const addExperience = (amount: number = 1) => {
    setUserData({ ...userData, experience: userData.experience + amount });
  };

  const removeExperience = (amount: number = 1) => {
    setUserData({ ...userData, experience: userData.experience - amount });
  };
  //TODO save data immediately, even before user actions

  // common, rare, unique, blessed, divine

  // useEffect(() => {
  //   function handleEventListener() {
  //     console.log('[UserDataProvider] plantClicked received');

  //     removeGrowthPoints(1);
  //     // dispatch({ type: 'TICK' });
  //   }

  //   window.addEventListener('plantClicked', handleEventListener);

  //   return () => {
  //     window.removeEventListener('plantClicked', handleEventListener);
  //   };
  // }, []);

  function getExperienceTier(xp: number) {
    // const tiers = Object.entries(Tiers).find(([key, value]) => value.experienceThreshold >= xp)
    // console.log(tiers)
    // const Tiers = Object.entries(Experience)
    //   .filter(([key, value]) => typeof value === 'number') as [string, number][];

    // // Sort tiers from highest XP to lowest XP
    // Tiers.sort((a, b) => b[1] - a[1]);

    // // Find the first tier where the player's XP is >= the threshold
    // const matchedTier = Tiers.find(([key, value]) => xp >= value);

    // if (matchedTier) {
    //   // Return the string key (e.g., "RARE")
    //   return matchedTier[0] as keyof typeof Experience;
    // }

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
    getExperienceTier,
    editState,
    setEditState
    // time,
    // getDisplayTime,
    // start,
    // pause,
    // isTimerRunning
  };

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
};
