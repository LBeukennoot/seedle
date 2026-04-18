import type { Plants } from "../../PlantElement/types"

export type RewardPopupProps = {
    reward: Plants,
    title: string,
    claim: Function
}