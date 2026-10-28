import type { PlantPaletteKey, PlantSpecies } from '../../../plants/generated';

export type RewardPopupProps<T extends PlantSpecies = PlantSpecies> = {
  reward: T;
  palette: PlantPaletteKey<T>; // Strictly autocompletes available palettes for flower T
  claim: () => void;
};