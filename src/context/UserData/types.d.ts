import type { Plant } from "../../components/PlantElement/types"

export type UserDataProviderProps = {
    children: string | JSX.Element | JSX.Element[]
}

export type UserDataContextType = {
    plants: Plant[]
    setPlants: () => void
    removeAllPlants: () => void
    editPlant: (plantId: string, data: Record<Plant>) => void
    createPlant: (data) => void
    removePlant: (id) => void
    savePlants: () => void
    tickPlants: () => void
}