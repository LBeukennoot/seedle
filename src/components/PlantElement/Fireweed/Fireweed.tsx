import { FireweedStage1 } from "./FireweedStage1";
import { FireweedStage2 } from "./FireweedStage2";
import { FireweedStage3 } from "./FireweedStage3";
import { FireweedStage4 } from "./FireweedStage4";
import type { IndividualPlantProps, Stage } from "../types";


export const Fireweed = ({ stage, size }: IndividualPlantProps) => {
    const stages: Stage = {
        1: <FireweedStage1 size={size} />,
        2: <FireweedStage2 size={size} />,
        3: <FireweedStage3 size={size} />,
        4: <FireweedStage4 size={size} />,
    }

    const StageComponent = stages[stage]

    return StageComponent
}