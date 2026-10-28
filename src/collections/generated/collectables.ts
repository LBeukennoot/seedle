// AUTO-GENERATED - DO NOT EDIT MANUALLY
import type { CollectableItem } from './collectables.d';
import type { PlantSpecies } from './types';

export const INITIAL_COLLECTABLES: CollectableItem[] = [
  {
    id: "chicory_default_10",
    plant: "chicory" as PlantSpecies,
    palette: "default" as any,
    threshold: 10,
    displayName: "Chicory",
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "camomile_default_23",
    plant: "camomile" as PlantSpecies,
    palette: "default" as any,
    threshold: 23,
    displayName: "Camomile",
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "lantana_red_39",
    plant: "lantana" as PlantSpecies,
    palette: "red" as any,
    threshold: 39,
    displayName: "Lantana",
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "lavender_default_55",
    plant: "lavender" as PlantSpecies,
    palette: "default" as any,
    threshold: 55,
    displayName: "Lavender",
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "lantana_default_75",
    plant: "lantana" as PlantSpecies,
    palette: "default" as any,
    threshold: 75,
    displayName: "Lantana",
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "lantana_pink_95",
    plant: "lantana" as PlantSpecies,
    palette: "pink" as any,
    threshold: 95,
    displayName: "Lantana",
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "fireweed_default_120",
    plant: "fireweed" as PlantSpecies,
    palette: "default" as any,
    threshold: 120,
    displayName: "Fireweed",
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "lantana_purple_140",
    plant: "lantana" as PlantSpecies,
    palette: "purple" as any,
    threshold: 140,
    displayName: "Lantana",
    unlocked: false,
    unlockedAt: null,
  },
];

export function getUnlockedCollectables(
  items: CollectableItem[] = INITIAL_COLLECTABLES
): CollectableItem[] {
  return items.filter((item) => item.unlocked);
}

export function getRandomUnlockedCollectable(
  items: CollectableItem[] = INITIAL_COLLECTABLES
): CollectableItem {
  const unlocked = getUnlockedCollectables(items);
  if (unlocked.length === 0) return items[0];
  const index = Math.floor(Math.random() * unlocked.length);
  return unlocked[index];
}
