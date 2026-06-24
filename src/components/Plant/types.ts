import type { JSX } from 'react';

export enum PlantSpecies {
  CHIRARY = 'CHIRARY',
  CHAMOMILE = 'CHAMOMILE',
  FIREWEED = 'FIREWEED',
  LAVENDER = 'LAVENDER'
}

export type PlantData = {
  id: string;
  // gardenId: string;
  x: number | undefined; // 0–1
  y: number | undefined; // 0–1 //TODO change this to position: {x,y}
  size: number; // 0–1F
  name: PlantSpecies;
  stage: number;
  maxStage: number;
  createdAt: number;
  grownAt?: number | null;
  maxAge: number | undefined; //in days
  mirrored: boolean;

};

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