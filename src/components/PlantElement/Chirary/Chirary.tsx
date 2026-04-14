import { ChiraryStage1 } from "./ChiraryStage1";
import { ChiraryStage2 } from "./ChiraryStage2";
import { ChiraryStage3 } from "./ChiraryStage3";
import { ChiraryStage4 } from "./ChiraryStage4";

import type { IndividualPlantProps, Stage } from "../types";

export const Chirary = ({ stage, size }: IndividualPlantProps) => {
    const stages: Stage = {
        1: <ChiraryStage1 size={size} />,
        2: <ChiraryStage2 size={size} />,
        3: <ChiraryStage3 size={size} />,
        4: <ChiraryStage4 size={size} />,
    }

    const StageComponent = stages[stage]

    return StageComponent
}