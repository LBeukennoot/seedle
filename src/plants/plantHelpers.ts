import type { PlantStageKey } from "../components/Plant/Plant";
import { plantPalettes, plants } from "./generated";
import type { PlantPaletteKey, PlantSpecies } from "./generated/types";

export function getLastStageKey<T extends keyof typeof plants>(
  species: T
): PlantStageKey<T> {
  const { stages, stagesTree } = plants[species];

  // 1. Terminal stages are nodes with empty transition arrays in stagesTree
  const terminalKeys = (
    Object.keys(stagesTree) as PlantStageKey<T>[]
  ).filter((key) => {
    const next = stagesTree[key];
    return Array.isArray(next) && next.length === 0;
  });

  if (terminalKeys.length > 0) {
    return terminalKeys[0]; // e.g. "4" or "4_1"
  }

  // 2. Fallback: highest numerical stage from stages object
  const stageKeys = Object.keys(stages) as PlantStageKey<T>[];
  return stageKeys[stageKeys.length - 1];
}


/**
 * 1. Randomly selects a plant species key
 */
export function randomPlant(): PlantSpecies {
  const speciesList = Object.keys(plants) as PlantSpecies[];
  const randomIndex = Math.floor(Math.random() * speciesList.length);
  return speciesList[randomIndex];
}

/**
 * 2. Randomly selects an available palette for the chosen plant
 */
export function randomPalette<T extends PlantSpecies>(plant: T): PlantPaletteKey<T> {
  // Cast via Record lookup so TypeScript permits union key indexing:
  const palettes = (plantPalettes as Record<PlantSpecies, Record<string, unknown>>)[plant];
  const paletteKeys = Object.keys(palettes) as PlantPaletteKey<T>[];
  
  const randomIndex = Math.floor(Math.random() * paletteKeys.length);
  return paletteKeys[randomIndex];
}

/**
 * 3. Traces a random valid growth path from root ("1") to terminal bloom
 * Output format: [["1"], ["2_1"], ["3_1"], ["4_1"]]
 */
export function randomPath<T extends PlantSpecies>(plant: T): [PlantStageKey<T>][] {
  const { stagesTree } = plants[plant];

  // Every plant tree starts at stage "1"
  let currentStage = '1' as PlantStageKey<T>;
  const path: [PlantStageKey<T>][] = [[currentStage]];

  while (true) {
    const nextOptions = stagesTree[currentStage] as PlantStageKey<T>[] | undefined;

    // Terminal stage reached (no further growth transitions)
    if (!nextOptions || nextOptions.length === 0) {
      break;
    }

    // Pick a random child branch if the tree splits
    const randomIndex = Math.floor(Math.random() * nextOptions.length);
    currentStage = nextOptions[randomIndex];
    path.push([currentStage]);
  }

  return path;
}

export const availablePlants = (Object.keys(plants) as (keyof typeof plants)[]).map((key) => {
  const plantDef = plants[key];
  return {
    key, // 'camomile' (used for plant data/storage)
    label: plantDef.displayName ?? plantDef.name, // Display text
  };
});

export function getFirstStageKey<T extends PlantSpecies>(
  species: T
): PlantStageKey<T> {
  const { stages, stagesTree } = plants[species];

  // 1. Check if the canonical root "1" exists in stages
  if ('1' in stages) {
    return '1' as PlantStageKey<T>;
  }

  // 2. Fallback: find the node in stagesTree with in-degree 0 (no other stage leads to it)
  const allTargets = new Set<string>();
  for (const nextStages of Object.values(stagesTree)) {
    for (const target of nextStages as string[]) {
      allTargets.add(target);
    }
  }

  const stageKeys = Object.keys(stages) as PlantStageKey<T>[];
  const rootKey = stageKeys.find((key) => !allTargets.has(key));

  return rootKey ?? stageKeys[0];
}

export function getRelativePathStage(
  currentStage: string,
  path: [string][],
  direction: 1 | -1
): string | null {
  // Find index where the tuple's first element matches currentStage
  const currentIndex = path.findIndex(([s]) => s === currentStage);

  if (currentIndex === -1) return null;

  const targetIndex = currentIndex + direction;

  // Boundary check: cannot go past bloom or before root
  if (targetIndex < 0 || targetIndex >= path.length) {
    return null;
  }

  return path[targetIndex][0];
}