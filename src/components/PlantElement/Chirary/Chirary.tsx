import { ChiraryStage1 } from "./ChiraryStage1";
import { ChiraryStage2 } from "./ChiraryStage2";
import { ChiraryStage3 } from "./ChiraryStage3";
import { ChiraryStage4 } from "./ChiraryStage4";
import type { IndividualPlantGroupProps, Stage } from "../types";

export const Chirary = ({ stage, className }: IndividualPlantGroupProps) => {
    const stages: Stage = {
        1: <ChiraryStage1 className={className} />,
        2: <ChiraryStage2 className={className} />,
        3: <ChiraryStage3 className={className} />,
        4: <ChiraryStage4 className={className} />,
    }

    const StageComponent = stages[stage]

    return StageComponent
}