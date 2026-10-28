import type { JSX } from 'react';
import type { ExtractPlantStages, PlantPaletteKey, PlantSpecies } from '../../plants/generated/types';
import type { plants } from '../../plants/generated';

// export enum PlantSpecies {
//   CHICORY = 'CHICORY',
//   CHIRARY = 'CHIRARY',
//   CHAMOMILE = 'CHAMOMILE',
//   FIREWEED = 'FIREWEED',
//   LAVENDER = 'LAVENDER'
// }

interface BasePlantData {
  id: string;

  // Data for visuals
  position: {
    x: number;
    y: number;
  };
  size: number;
  mirrored: boolean;

  // Data for stats
  createdAt: number;
  grownAt?: number | null;
}

// Discriminated union: correlates plant, stage, path, and palette per flower
export type PlantData = {
  [K in PlantSpecies]: BasePlantData & {
    /** The specific plant species identifier */
    plant: K;

    /** The current active stage key for this specific flower */
    stage: ExtractPlantStages<(typeof plants)[K]>;

    /** The growth path taken, formatted as an array of single-item stage tuples */
    path: [ExtractPlantStages<(typeof plants)[K]>][];

    /** Optional/recommended: store the unlocked palette key alongside the plant */
    palette: PlantPaletteKey<K>;
  };
}[PlantSpecies];

export type PlantProps = {
  plant: PlantData;
  className: string;
  x: number;
  y: number;
  onClick: () => void;
};

export type PlantStageAsset = {
    viewBox: string;
    children: JSX.Element
}

export type PlantGrowthStages = Record<number, PlantStageAsset>;