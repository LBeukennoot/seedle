import type { Plant, PlantColorSlots } from "./types"
import { CamomileStages } from "./Camomile"
import { ChicoryStages } from "./Chicory"
import { FireweedStages } from "./Fireweed"
import { LantanaStages } from "./Lantana"
import { LavenderStages } from "./Lavender"

export * from "./Camomile"
export * from "./Chicory"
export * from "./Fireweed"
export * from "./Lantana"
export * from "./Lavender"

export const plants = {
  "camomile": CamomileStages,
  "chicory": ChicoryStages,
  "fireweed": FireweedStages,
  "lantana": LantanaStages,
  "lavender": LavenderStages,
} satisfies Record<string, Plant<PlantColorSlots>>;
