import { useEffect, useState } from 'react';
import {
  Experience,
  Tiers,
  // type EditState,
  type UserDataContextType,
  type UserDataProviderProps,
  type UserStatistics
} from './types';
import { UserDataContext } from './UserDataContext';
import LocalStorage from '../../utils/LocalStorage';
import { initialUserStatistics } from './constants';

const localStorage = new LocalStorage();

export const UserDataProvider = ({ children }: UserDataProviderProps) => {
  // const [editState, setEditState] = useState<EditState>('OFF');
  const [userStatistics, setUserStatistics] = useState<UserStatistics>(():UserStatistics => {
    const stored = localStorage.getValue('userStatistics');
    return stored ? stored as UserStatistics : initialUserStatistics;
  });

  useEffect(() => {
    localStorage.setValue('userStatistics', userStatistics);
  }, [userStatistics]);

  // useEffect(() => {
  //   const stored = localStorage.getValue('userStatistics');

  //   //TODO also save data when its being changed
  //   if (stored) {
  //     setUserStatistics(stored as UserStatistics);
  //   } else {
  //     localStorage.setValue('userStatistics', userStatistics);
  //   }
  // }, []);

  // const add = ({stat, amount}: {stat: Omit<UserStatistics>, amount: number}) => {
  //   setUserStatistics({ ...userStatistics, totalPlants: userStatistics[stat] + amount });
  // }

  const addTotalPlants = (amount: number = 1) => {
    setUserStatistics({ ...userStatistics, totalPlants: userStatistics.totalPlants + amount });
  };

  // const removeGrowthPoints = (amount: number = 1) => {
  //   if (userData.growthPoints > 0) setUserData({ ...userStatistics, growthPoints: userStatistics.growthPoints - amount });
  // };

  const addTotalFocusSessions = (amount: number = 1) => {
    setUserStatistics({ ...userStatistics, totalFocusSessions: userStatistics.totalFocusSessions + amount });
  };

  // const removeExperience = (amount: number = 1) => {
  //   setUserData({ ...userStatistics, experience: userStatistics.experience - amount });
  // };
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

  // function getExperienceTier(xp: number) {
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

  //   return 'COMMON';
  // }

  //   console.log(getExperienceTier(41));
  // chirary: common
  // chamomile: rare
  // fireweed: divine
  // lavender: rare

  const value: UserDataContextType = {
    userStatistics,
    addTotalPlants,
    // removeGrowthPoints,
    addTotalFocusSessions,
    // removeExperience,
    // getExperienceTier,
    // editState,
    // setEditState
    // time,
    // getDisplayTime,
    // start,
    // pause,
    // isTimerRunning
  };

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
};
