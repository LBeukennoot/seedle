// AUTO-GENERATED - DO NOT EDIT MANUALLY
import type { PlantSpecies, PlantPaletteKey } from './types';

export interface CollectableItem<T extends PlantSpecies = PlantSpecies> {
  id: string;
  plant: T;
  palette: PlantPaletteKey<T>;
  threshold: number;
  displayName: string;
  unlocked: boolean;
  unlockedAt: number | null;
}
