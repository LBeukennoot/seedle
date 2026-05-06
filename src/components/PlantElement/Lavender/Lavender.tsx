import { LavenderStage1 } from "./LavenderStage1";
import { LavenderStage2 } from "./LavenderStage2";
import { LavenderStage3 } from "./LavenderStage3";
import { LavenderStage4 } from "./LavenderStage4";
import type { IndividualPlantProps, Stage } from "../types";


export const Lavender = ({ stage, size }: IndividualPlantProps) => {
    const stages: Stage = {
        1: <LavenderStage1 size={size} />,
        2: <LavenderStage2 size={size} />,
        3: <LavenderStage3 size={size} />,
        4: <LavenderStage4 size={size} />,
    }

    const StageComponent = stages[stage]

    return StageComponent
}