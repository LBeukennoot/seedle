import type { PlantProps } from "."
import { Chirary } from "./Chirary/Chirary"

export const PlantElement = ({ stage = 1, plant }: PlantProps) => {
    return (
        <Chirary size={200} stage={stage} />
    )
}