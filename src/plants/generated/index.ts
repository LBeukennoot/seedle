import { CamomileStages } from './Camomile';
import { ChicoryStages } from './Chicory';
import { FireweedStages } from './Fireweed';
import { LantanaStages } from './Lantana';
import { LavenderStages } from './Lavender';

export * from './Camomile';
export * from './Chicory';
export * from './Fireweed';
export * from './Lantana';
export * from './Lavender';

export const plants: Record<string, any> = {
  Camomile: CamomileStages,
  Chicory: ChicoryStages,
  Fireweed: FireweedStages,
  Lantana: LantanaStages,
  Lavender: LavenderStages
};
