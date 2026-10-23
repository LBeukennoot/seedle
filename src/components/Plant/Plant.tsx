import { plants } from "../../plants/generated";
import { Icon } from "../Icons/Icon";
// import { Chamomile } from "./Plants/Chamomile";
// import { Chicory } from "./Plants/Chicory";
// import { Chirary } from "./Plants/Chirary";
// import { Fireweed } from "./Plants/Fireweed";
// import { Lavender } from "./Plants/Lavender";
import { PlantSpecies, type PlantStageAsset } from "./types";

// const PLANT_ASSETS: Record<PlantSpecies, Record<string, PlantStageAsset>> = {
//   [PlantSpecies.CHICORY]: Chicory,
//   [PlantSpecies.CHIRARY]: Chirary,
//   [PlantSpecies.CHAMOMILE]: Chamomile,
//   [PlantSpecies.FIREWEED]: Fireweed,
//   [PlantSpecies.LAVENDER]: Lavender,
// }




export const Plant = ({ name, path, stage, className }: { name: PlantSpecies; path: string; stage: number; className: string }) => {
// 2. Get the stage dictionary for the specific plant species
  const plantStages = plants["Chicory"];
  // const plantStages = PLANT_ASSETS[name];
  if (!plantStages) return null;

  // 3. Get the specific asset data (viewBox and paths) for the current stage
  if(!path) return
  const pathStage = path[stage - 1]
  const currentStageAsset = plantStages[pathStage];
  // console.log(path[])
  console.log(currentStageAsset)
  if (!currentStageAsset) return null;

  // 4. Render your single, shared <Icon /> component using the asset data
  return (
    <Icon className={className} viewBox={currentStageAsset.viewBox}>
      {currentStageAsset.children}
    </Icon>
  );
};