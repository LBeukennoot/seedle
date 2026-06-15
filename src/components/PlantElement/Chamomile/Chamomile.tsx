import type { IndividualPlantGroupProps, Stage } from "../types";
import { ChamomileStage1 } from "./ChamomileStage1";
import { ChamomileStage2 } from "./ChamomileStage2";
import { ChamomileStage3 } from "./ChamomileStage3";
import { ChamomileStage4 } from "./ChamomileStage4";

export const Chamomile = ({ stage, className }: IndividualPlantGroupProps) => {
    const stages: Stage = {
        1: <ChamomileStage1 className={className} />,
        2: <ChamomileStage2 className={className} />,
        3: <ChamomileStage3 className={className} />,
        4: <ChamomileStage4 className={className} />,
    }

    const StageComponent = stages[stage]

    return StageComponent
}