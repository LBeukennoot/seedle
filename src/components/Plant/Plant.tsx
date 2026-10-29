import type { JSX } from 'react';
import { plants } from '../../plants/generated';
import { Icon } from '../Icons/Icon';
import type { ExtractPlantColors, ExtractPlantStages, PlantStageData } from '../../plants/generated/types';

export type PlantName = keyof typeof plants;

export type PlantStageKey<T extends PlantName> = ExtractPlantStages<(typeof plants)[T]>;

export type PlantColors<T extends PlantName> = ExtractPlantColors<(typeof plants)[T]>;

export interface PlantProps<T extends PlantName> {
  name: T;
  stage: PlantStageKey<T>;
  className?: string;
  colors?: Partial<PlantColors<T>>;
}

export const Plant = <T extends PlantName>({ name, stage, className, colors = {} }: PlantProps<T>): JSX.Element => {
  const plantDef = plants[name];
  if (!plantDef) return <></>;

  const stages = plantDef.stages as Record<string, PlantStageData<PlantColors<T>>>;
  const stageData = stages[stage as string];

  if (!stageData) return <></>;


  return (
    <Icon className={className} viewBox={stageData.asset.viewBox}>
      {stageData.asset.render(colors as PlantColors<T>)}
    </Icon>
  );
};
