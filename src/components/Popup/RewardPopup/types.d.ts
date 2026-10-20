import type { PlantSpecies } from "../../Plant/types"

export type RewardPopupProps = {
    reward: PlantSpecies,
    title: string,
    claim: () => void
}