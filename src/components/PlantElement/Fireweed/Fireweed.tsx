import { FireweedStage1 } from "./FireweedStage1";
import { FireweedStage2 } from "./FireweedStage2";
import { FireweedStage3 } from "./FireweedStage3";
import { FireweedStage4 } from "./FireweedStage4";
import type { IndividualPlantGroupProps, Stage } from "../types";


export const Fireweed = ({ stage, className }: IndividualPlantGroupProps) => {
    const stages: Stage = {
        1: <FireweedStage1 className={className} />,
        2: <FireweedStage2 className={className} />,
        3: <FireweedStage3 className={className} />,
        4: <FireweedStage4 className={className} />,
    }

    const StageComponent = stages[stage]

    return StageComponent
}