import { plants } from '../../plants/generated';
import type { PlantSpecies } from './types';

export type UnlockRequirementType = 'pomodoros_completed' | 'plants_grown';

export interface CollectibleItem {
  plant: PlantSpecies;
  displayName: string;
  unlocked: boolean;
  unlockedAt: number | null;
  threshold: {
    type: UnlockRequirementType;
    value: number;
  };
}

// Initial registry with default unlock thresholds
export const INITIAL_COLLECTIBLES: Record<PlantSpecies, CollectibleItem> = {
  camomile: {
    plant: 'camomile',
    displayName: plants.camomile.displayName ?? 'Camomile',
    unlocked: true, // Starter flower unlocked from day 1
    unlockedAt: 0,
    threshold: { type: 'plants_grown', value: 0 },
  },
  chicory: {
    plant: 'chicory',
    displayName: plants.chicory.displayName ?? 'Chicory',
    unlocked: false,
    unlockedAt: null,
    threshold: { type: 'plants_grown', value: 5 },
  },
  fireweed: {
    plant: 'fireweed',
    displayName: plants.fireweed.displayName ?? 'Fireweed',
    unlocked: false,
    unlockedAt: null,
    threshold: { type: 'plants_grown', value: 15 },
  },
  lantana: {
    plant: 'lantana',
    displayName: plants.lantana.displayName ?? 'Lantana',
    unlocked: false,
    unlockedAt: null,
    threshold: { type: 'plants_grown', value: 30 },
  },
  lavender: {
    plant: 'lavender',
    displayName: plants.lavender.displayName ?? 'Lavender',
    unlocked: false,
    unlockedAt: null,
    threshold: { type: 'plants_grown', value: 50 },
  },
};