import type { PlantProps } from "."
import { Chamomile } from "./Chamomile/Chamomile"
import { Chirary } from "./Chirary/Chirary"
import { Plants } from "./types"

export const PlantElement = ({ stage = 1, plant, size = 200 }: PlantProps) => {

    const elements = {
        [Plants.CHIRARY]: <Chirary size={size} stage={stage} />,
        [Plants.CHAMOMILE]: <Chamomile size={size} stage={stage} />,
    }

    return (
        elements[plant]
    )
}