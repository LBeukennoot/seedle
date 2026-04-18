import type { PlantProps } from "."
import { Chirary } from "./Chirary/Chirary"
import { Plants } from "./types"

export const PlantElement = ({ stage = 1, plant }: PlantProps) => {

    const elements = {
        [Plants.CHIRARY]: <Chirary size={200} stage={stage} />
    }

    return (
        elements[plant]
    )
}