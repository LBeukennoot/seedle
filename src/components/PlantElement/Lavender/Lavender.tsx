import { LavenderStage1 } from "./LavenderStage1";
import { LavenderStage2 } from "./LavenderStage2";
import { LavenderStage3 } from "./LavenderStage3";
import { LavenderStage4 } from "./LavenderStage4";
import type { IndividualPlantGroupProps, Stage } from "../types";


export const Lavender = ({ stage, className }: IndividualPlantGroupProps) => {
    const stages: Stage = {
        1: <LavenderStage1 className={className} />,
        2: <LavenderStage2 className={className} />,
        3: <LavenderStage3 className={className} />,
        4: <LavenderStage4 className={className} />,
    }

    const StageComponent = stages[stage]

    return StageComponent
}