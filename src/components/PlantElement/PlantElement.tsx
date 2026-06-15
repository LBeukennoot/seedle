import type { PlantProps } from "."
import { Chamomile } from "./Chamomile/Chamomile"
import { Chirary } from "./Chirary/Chirary"
import { Fireweed } from "./Fireweed/Fireweed"
import { Lavender } from "./Lavender/Lavender"
import { Plants } from "./types"

export const PlantElement = ({ stage = 1, plant, className }: PlantProps) => {

    //TODO make sure plant is squared to prevent wrong clicking
    const elements = {
        [Plants.CHIRARY]: <Chirary stage={stage} className={className} />,
        [Plants.CHAMOMILE]: <Chamomile stage={stage} className={className} />,
        [Plants.FIREWEED]: <Fireweed stage={stage} className={className} />,
        [Plants.LAVENDER]: <Lavender stage={stage} className={className} />,
    }

    return (
        elements[plant]
    )
}