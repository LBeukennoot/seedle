// types.ts
import type { ReactElement } from 'react';
import type { plantPalettes, plants } from '.';

export type PlantColorSlots = Record<string, string>;

export interface PlantStageAsset<TColors extends PlantColorSlots> {
  viewBox: string;
  render: (colors: TColors) => ReactElement;
}

export interface PlantStageData<TColors extends PlantColorSlots> {
  displayName?: string;
  asset: PlantStageAsset<TColors>;
}

export interface PlantDefinition<TColors extends PlantColorSlots = PlantColorSlots, TStages extends string = string> {
  name: string;
  displayName?: string;
  stages: Record<TStages, PlantStageData<TColors>>;
  stagesTree: Record<TStages, TStages[]>;
}

// Fallback for TypeScript < 5.4 if NoInfer is not built-in:
type SafeNoInfer<T> = [T][T extends any ? 0 : never];

/**
 * Curried helper:
 * 1. Infers TStages ONLY from the keys of `stages`
 * 2. Uses NoInfer so `stagesTree` cannot tamper with or shrink `TStages`
 */
export function definePlant<TColors extends PlantColorSlots>() {
  return <TStages extends string>(definition: {
    name: string;
    displayName?: string;
    stages: Record<TStages, PlantStageData<TColors>>;
    stagesTree: Record<SafeNoInfer<TStages>, SafeNoInfer<TStages>[]>;
  }): PlantDefinition<TColors, TStages> => definition;
}

// Extracts TColors directly from PlantDefinition<TColors, any>
export type ExtractPlantColors<T> = T extends PlantDefinition<infer TColors, any> ? TColors : PlantColorSlots;

// Extracts TStages directly from PlantDefinition<any, TStages>
export type ExtractPlantStages<T> = T extends PlantDefinition<any, infer TStages> ? TStages : string;

// Valid flower names
export type PlantSpecies = keyof typeof plants;

// Extracts the valid palette keys (e.g. "classic" | "sunset" | "default") for flower T
export type PlantPaletteKey<T extends PlantSpecies> = keyof (typeof plantPalettes)[T];
