import type { PlantDefinition, PlantColorSlots } from "./types";
import { Camomile, camomilePalettes } from "./Camomile";
import { Chicory, chicoryPalettes } from "./Chicory";
import { Fireweed, fireweedPalettes } from "./Fireweed";
import { Lantana, lantanaPalettes } from "./Lantana";
import { Lavender, lavenderPalettes } from "./Lavender";

export * from "./Camomile";
export * from "./Chicory";
export * from "./Fireweed";
export * from "./Lantana";
export * from "./Lavender";

export const plants = {
  "camomile": Camomile,
  "chicory": Chicory,
  "fireweed": Fireweed,
  "lantana": Lantana,
  "lavender": Lavender,
} satisfies Record<string, PlantDefinition<any, any>>;

export const plantPalettes = {
  "camomile": camomilePalettes,
  "chicory": chicoryPalettes,
  "fireweed": fireweedPalettes,
  "lantana": lantanaPalettes,
  "lavender": lavenderPalettes,
} as const;
