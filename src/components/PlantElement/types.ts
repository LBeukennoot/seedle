import type { JSX } from 'react';

export enum Plants {
  CHIRARY = 'CHIRARY',
  CHAMOMILE = 'CHAMOMILE',
  FIREWEED = 'FIREWEED',
  LAVENDER = 'LAVENDER'
}

export type Plant = {
  id: string;
  // gardenId: string;
  x: number | undefined; // 0–1
  y: number | undefined; // 0–1
  size: number; // 0–1F
  name: Plants;
  stage: number;
  maxStage: number;
  createdAt: number;
  grownAt?: number | null;
  maxAge: number | undefined; //in days
  mirrored: boolean;

  // constructor({ id, gardenId, x, y, size, name }: Plant) {
  //     this.id = id
  //     this.gardenId = gardenId
  //     this.x = x
  //     this.y = y
  //     this.size = size
  //     this.name = name
  //     this.stage = 1
  // }

  // grow() {
  //     if (this.stage < 4) {
  //         this.stage += 1
  //     }
  // }
};

export type PlantProps = {
  plant: Plant;
  className: string;
  x: number;
  y: number;
  onClick: () => void;
};

export type IndividualPlantGroupProps = {
  stage: number;
  className: string;
};

export type IndividualPlantStageProps = {
  className: string;
};

export type Stage = {
  [key: number]: JSX.Element;
};
