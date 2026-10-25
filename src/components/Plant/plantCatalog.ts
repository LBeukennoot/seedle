// import plantGraphs from '../../../plant_export/generated/plants.json';
import { plants } from '../../plants/generated/index';
import { PlantSpecies } from './types';

export type PlantGrowthTree = keyof typeof plants;
export type PlantGrowthNode = {
  [Tree in PlantGrowthTree]: keyof (typeof plants)[Tree] & string;
}[PlantGrowthTree];

type PlantDefinition = {
  displayName: string;
  growthTree?: PlantGrowthTree;
  maxStage?: number;
};

export const PLANT_CATALOG: Record<PlantSpecies, PlantDefinition> = {
  [PlantSpecies.CHICORY]: {
    displayName: 'Chicory',
    growthTree: 'chicory'
  },
  [PlantSpecies.CHIRARY]: {
    displayName: 'Chirary',
    maxStage: 4
  },
  [PlantSpecies.CHAMOMILE]: {
    displayName: 'Chamomile',
    growthTree: 'camomile'
  },
  [PlantSpecies.FIREWEED]: {
    displayName: 'Fireweed',
    growthTree: 'fireweed'
  },
  [PlantSpecies.LAVENDER]: {
    displayName: 'Lavender',
    growthTree: 'lavender'
  }
} satisfies Record<PlantSpecies, PlantDefinition>;

export const createRandomGrowthPath = (species: PlantSpecies): PlantGrowthNode[] | undefined => {
  const treeName = PLANT_CATALOG[species].growthTree;
  if (!treeName) return undefined;

  const tree = plants[treeName] as Record<string, string[]>;
  if (!Object.hasOwn(tree, '1')) {
    throw new Error(`Growth tree "${treeName}" is missing its stage 1 root.`);
  }

  const path: PlantGrowthNode[] = [];
  let stage: string | undefined = '1';

  while (stage !== undefined) {
    path.push(stage as PlantGrowthNode);
    const nextStages: string[] | undefined = tree[stage];
    if (!nextStages || nextStages.length === 0) break;
    stage = nextStages[Math.floor(Math.random() * nextStages.length)];
  }

  return path;
};

export const getPlantMaxStage = (species: PlantSpecies, path?: PlantGrowthNode[]): number => {
  if (path) return path.length;

  const maxStage = PLANT_CATALOG[species].maxStage;
  if (maxStage === undefined) {
    throw new Error(`Plant "${species}" has no growth tree or configured max stage.`);
  }

  return maxStage;
};
