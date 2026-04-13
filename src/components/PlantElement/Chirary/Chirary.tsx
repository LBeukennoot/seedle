import { ChiraryStage1 } from "./ChiraryStage1";
import { ChiraryStage2 } from "./ChiraryStage2";
import { ChiraryStage3 } from "./ChiraryStage3";
import { ChiraryStage4 } from "./ChiraryStage4";

import type { IndividualPlantProps, Stage } from "../types";

export const Chirary = ({ stage, size }: IndividualPlantProps) => {
    const stages: Stage = {
        1: ChiraryStage1,
        2: ChiraryStage2,
        3: ChiraryStage3,
        4: ChiraryStage4,
    }

    const StageComponent = stages[stage]

    return <StageComponent size={size} />
}