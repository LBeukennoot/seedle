import { Chamomile } from "./Plants/Chamomile";
import { Chirary } from "./Plants/Chirary";
import { Fireweed } from "./Plants/Fireweed";
import { Lavender } from "./Plants/Lavender";
import { PlantSpecies } from "./types";

export const PLANT_ASSETS = {
  [PlantSpecies.CHIRARY]: Chirary,
  [PlantSpecies.CHAMOMILE]: Chamomile,
  [PlantSpecies.FIREWEED]: Fireweed,
  [PlantSpecies.LAVENDER]: Lavender,
}