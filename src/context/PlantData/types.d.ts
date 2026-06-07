import type { Plant } from "../../components/PlantElement/types"

export type PlantDataProviderProps = {
    children: string | JSX.Element | JSX.Element[]
}

export type PlantDataContextType = {
    plants: Plant[]
    setPlants: () => void
    removeAllPlants: () => void
    editPlant: (plantId: string, data: Record<Plant>) => void
    createPlant: (data) => void
    removePlant: (id) => void
    savePlants: () => void
    tickPlants: () => void
}