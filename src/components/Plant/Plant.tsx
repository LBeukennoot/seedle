import { Icon } from "../Icons/Icon";
import { Chamomile } from "./Plants/Chamomile";
import { Chirary } from "./Plants/Chirary";
import { Fireweed } from "./Plants/Fireweed";
import { Lavender } from "./Plants/Lavender";
import { PlantSpecies, type PlantStageAsset } from "./types";

const PLANT_ASSETS: Record<PlantSpecies, Record<number, PlantStageAsset>> = {
  [PlantSpecies.CHIRARY]: Chirary,
  [PlantSpecies.CHAMOMILE]: Chamomile,
  [PlantSpecies.FIREWEED]: Fireweed,
  [PlantSpecies.LAVENDER]: Lavender,
}

export const Plant = ({ name, stage, className }: { name: PlantSpecies; stage: number; className: string }) => {
// 2. Get the stage dictionary for the specific plant species
  const plantStages = PLANT_ASSETS[name];
  if (!plantStages) return null;

  // 3. Get the specific asset data (viewBox and paths) for the current stage
  const currentStageAsset = plantStages[stage];
  if (!currentStageAsset) return null;

  // 4. Render your single, shared <Icon /> component using the asset data
  return (
    <Icon className={className} viewBox={currentStageAsset.viewBox}>
      {currentStageAsset.children}
    </Icon>
  );
};