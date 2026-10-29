import { INITIAL_COLLECTABLES } from "../../collections/generated/collectables";
import type { CollectableItem } from "../../collections/generated/types";
import type { UserStatistics } from "./types";

export interface MilestoneCheckResult {
  nextStats: UserStatistics;
  newlyUnlocked: CollectableItem[];
}

export function checkCollectables(
  stats: UserStatistics,
  overrideTotalPlants?: number
): MilestoneCheckResult {
  const currentTotal = overrideTotalPlants ?? stats.total.plants;
  const updatedUnlocked = { ...stats.unlockedCollectables };
  const newlyUnlocked: CollectableItem[] = [];
  const now = Date.now();

  for (const item of INITIAL_COLLECTABLES) {
    const isUnlocked = Boolean(updatedUnlocked[item.id]);

    if (!isUnlocked && currentTotal >= item.threshold) {
      updatedUnlocked[item.id] = { unlockedAt: now };
      newlyUnlocked.push(item);
    }
  }

  return {
    nextStats: {
      ...stats,
      unlockedCollectables: updatedUnlocked,
    },
    newlyUnlocked,
  };
}