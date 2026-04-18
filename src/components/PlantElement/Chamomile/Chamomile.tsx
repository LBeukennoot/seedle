

import type { IndividualPlantProps, Stage } from "../types";
import { ChamomileStage1 } from "./ChamomileStage1";
import { ChamomileStage2 } from "./ChamomileStage2";
import { ChamomileStage3 } from "./ChamomileStage3";
import { ChamomileStage4 } from "./ChamomileStage4";

export const Chamomile = ({ stage, size }: IndividualPlantProps) => {
    const stages: Stage = {
        1: <ChamomileStage1 size={size} />,
        2: <ChamomileStage2 size={size} />,
        3: <ChamomileStage3 size={size} />,
        4: <ChamomileStage4 size={size} />,
    }

    const StageComponent = stages[stage]

    return StageComponent
}