import type { JSX } from 'react';
import { plants } from '../../plants/generated';
import { Icon } from '../Icons/Icon';
import type { PlantColorSlots } from '../../plants/generated/types';

// Grabs the color parameter from any stage of plant T
type PlantColors<T extends keyof typeof plants> = Parameters<
  (typeof plants)[T][keyof (typeof plants)[T]]["asset"]["render"]
>[0];


export const Plant = <T extends keyof typeof plants>({
  name,
  stage,
  className,
  colors = {}
}: {
  name: T;
  stage: string;
  className: string;
  colors: Partial<PlantColors<T>>;
}): JSX.Element => {
  // 2. Get the stage dictionary for the specific plant species
  const plantStages = plants[name];
  // const plantStages = PLANT_ASSETS[name];
  if (!plantStages) return <></>;

  // 3. Get the specific asset data (viewBox and paths) for the current stage
  const pathStage = plantStages[stage];
  console.log(stage);
  if (!pathStage) return <></>;

  // 4. Render your single, shared <Icon /> component using the asset data
  return (
    <Icon className={className} viewBox={pathStage.asset.viewBox}>
      {pathStage.asset.render(colors)}
      {/* {pathStage.asset.render({
        background: 'var(--color-light-purple)',
        outerPetals: 'var(--color-light-purple)',
        innerPetals: 'var(--color-purple)',
        petals: 'var(--color-white)',
        stamen: 'var(--color-yellow)',
        stem: 'var(--color-green)'
      })} */}
    </Icon>
  );
};

// export const Plant = ({ name, path, stage, className }: { name: PlantSpecies; path: string; stage: number; className: string }) => {
// // 2. Get the stage dictionary for the specific plant species
//   const plantStages = plants["Chicory"];
//   // const plantStages = PLANT_ASSETS[name];
//   if (!plantStages) return null;

//   // 3. Get the specific asset data (viewBox and paths) for the current stage
//   if(!path) return
//   const pathStage = path[stage - 1]
//   const currentStageAsset = plantStages[pathStage];
//   // console.log(path[])
//   console.log(currentStageAsset)
//   if (!currentStageAsset) return null;

//   // 4. Render your single, shared <Icon /> component using the asset data
//   return (
//     <Icon className={className} viewBox={currentStageAsset.viewBox}>
//       {currentStageAsset.children}
//     </Icon>
//   );
// };
