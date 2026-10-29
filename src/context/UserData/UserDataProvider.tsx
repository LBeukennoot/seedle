import { useCallback, useEffect, useState } from 'react';
import { type UserDataContextType, type UserDataProviderProps, type UserStatistics } from './types';
import { UserDataContext } from './UserDataContext';
import LocalStorage from '../../utils/LocalStorage';
import { initialUserStatistics } from './constants';
import type { CollectableItem } from '../../collections/generated/types';
import { INITIAL_COLLECTABLES } from '../../collections/generated/collectables';
import type { Mode } from '../../features/session/sessionTypes';

const localStorage = new LocalStorage();

export const UserDataProvider = ({ children }: UserDataProviderProps) => {
  const [userStatistics, setUserStatistics] = useState<UserStatistics>((): UserStatistics => {
    const stored = localStorage.getValue('userStatistics');
    if (!stored) return initialUserStatistics;

    const parsed = stored as UserStatistics;

    // Ensure zero-threshold starter flowers remain unlocked even across existing data
    return {
      ...parsed,
      unlockedCollectables: {
        ...initialUserStatistics.unlockedCollectables,
        ...parsed.unlockedCollectables
      }
    };
  });

  useEffect(() => {
    localStorage.setValue('userStatistics', userStatistics);
  }, [userStatistics]);

  /**
   * Evaluates unlock thresholds against current or target total plants
   */
  const evaluateUnlocks = useCallback(
    (
      stats: UserStatistics,
      targetTotalPlants?: number
    ): {
      updatedStats: UserStatistics;
      newlyUnlocked: CollectableItem[];
    } => {
      const totalPlants = targetTotalPlants ?? stats.total.plants;
      const updatedUnlocked = { ...stats.unlockedCollectables };
      const newlyUnlocked: CollectableItem[] = [];
      const now = Date.now();

      for (const item of INITIAL_COLLECTABLES) {
        const isUnlocked = Boolean(updatedUnlocked[item.id]);

        if (!isUnlocked && totalPlants >= item.threshold) {
          updatedUnlocked[item.id] = { unlockedAt: now };
          newlyUnlocked.push(item);
        }
      }

      return {
        updatedStats: {
          ...stats,
          unlockedCollectables: updatedUnlocked
        },
        newlyUnlocked
      };
    },
    []
  );

  /**
   * 1. addPlant: Increments total.plants and automatically unlocks newly qualified collectables
   */
  const addPlant = useCallback(
    (amount: number = 1, onUnlock?: (unlocked: CollectableItem[]) => void) => {
      setUserStatistics((prev) => {
        const nextTotalPlants = prev.total.plants + amount;
        const statsWithPlanted: UserStatistics = {
          ...prev,
          total: {
            ...prev.total,
            plants: nextTotalPlants
          }
        };

        const { updatedStats, newlyUnlocked } = evaluateUnlocks(statsWithPlanted, nextTotalPlants);

        if (newlyUnlocked.length > 0 && onUnlock) {
          console.log(newlyUnlocked);
          onUnlock(newlyUnlocked);
        }

        return updatedStats;
      });
    },
    [evaluateUnlocks]
  );

  /**
   * 2. addSession: Increments focus/rest counts across totals and the current monthly bucket
   */
  const addSession = useCallback((type: Mode) => {
    const monthKey = new Date().toISOString().slice(0, 7); // e.g., "2026-10"

    setUserStatistics((prev) => {
      const currentMonth = prev.monthly[monthKey] ?? {
        focus: 0,
        rest: 0,
        long_rest: 0
      };

      const totalKey = type === 'focus' ? 'focusSessions' : type === 'rest' ? 'restSessions' : 'longRestSessions';

      return {
        ...prev,
        total: {
          ...prev.total,
          [totalKey]: prev.total[totalKey] + 1
        },
        monthly: {
          ...prev.monthly,
          [monthKey]: {
            ...currentMonth,
            [type]: currentMonth[type] + 1
          }
        }
      };
    });
  }, []);

  const syncPlantsCount = useCallback((currentPlantCount: number, onUnlock?: (unlocked: CollectableItem[]) => void) => {
    setUserStatistics((prev) => {
      // Don't trigger state updates if the count is already in sync
      if (prev.total.plants === currentPlantCount) return prev;

      const updatedUnlocked = { ...prev.unlockedCollectables };
      const newlyUnlocked: CollectableItem[] = [];
      const now = Date.now();

      for (const item of INITIAL_COLLECTABLES) {
        if (!updatedUnlocked[item.id] && currentPlantCount >= item.threshold) {
          updatedUnlocked[item.id] = { unlockedAt: now };
          newlyUnlocked.push(item);
        }
      }

      if (newlyUnlocked.length > 0 && onUnlock) {
        onUnlock(newlyUnlocked);
      }

      return {
        ...prev,
        total: {
          ...prev.total,
          plants: currentPlantCount
        },
        unlockedCollectables: updatedUnlocked
      };
    });
  }, []);

  /**
   * 3. checkCollectablesMilestones: Triggers a retroactive check against current stats
   */
  const checkCollectablesMilestones = useCallback(
    (onUnlock?: (unlocked: CollectableItem[]) => void) => {
      setUserStatistics((prev) => {
        const { updatedStats, newlyUnlocked } = evaluateUnlocks(prev);

        if (newlyUnlocked.length > 0 && onUnlock) {
          onUnlock(newlyUnlocked);
        }

        return updatedStats;
      });
    },
    [evaluateUnlocks]
  );

  const value: UserDataContextType = {
    userStatistics,
    setUserStatistics,
    addPlant,
    addSession,
    syncPlantsCount,
    checkCollectablesMilestones
  };

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
};
