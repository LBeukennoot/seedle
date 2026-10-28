import type { JSX } from "react"
import type { Plant } from "../../components/PlantElement/types"
import type { PlantData } from "../../components/Plant/types"

export type PlantDataProviderProps = {
    children: string | JSX.Element | JSX.Element[]
}

export type PlantDataContextType = {
    plants: Plant[]
    // setPlants: () => void
    removeAllPlants: () => void
    editPlant: (data: PlantData) => void
    createPlant: (data: Omit<PlantData, 'id' | 'createdAt' | 'x' | 'y' | 'maxAge' | 'stage' | 'maxStage' | 'mirrored'>) => void
    createPlants: (plant: PlantData & { amount: number }) => void
    removePlant: (id: string) => void
    savePlants: () => void
    growPlant: (id: string) => void
    growAllPlants: () => void
    // plantables: Plant[] | undefined
    // setPlantables: (plantables: Plant[] | undefined) => void
}

export type PlantAction =
  | { type: 'CREATE'; plant: PlantData }
  | { type: 'BATCH_CREATE'; plant: PlantData & { amount: number} }
  | { type: 'EDIT'; data: PlantData }
  | { type: 'REMOVEALL' }
  | { type: 'REMOVE'; id: string | number }
  | { type: 'TICKONE'; id: string }
  | { type: 'TICKALL' };

export const COLS = 10
export const ROWS = 10