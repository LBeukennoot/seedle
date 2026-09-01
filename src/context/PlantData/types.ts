import type { JSX } from "react"
import type { Plant } from "../../components/PlantElement/types"

export type PlantDataProviderProps = {
    children: string | JSX.Element | JSX.Element[]
}

export type PlantDataContextType = {
    plants: Plant[]
    // setPlants: () => void
    removeAllPlants: () => void
    editPlant: (data: Plant) => void
    createPlant: (data: Omit<Plant, 'id' | 'createdAt' | 'x' | 'y' | 'maxAge' | 'stage' | 'maxStage' | 'mirrored'>) => void
    removePlant: (id: string) => void
    savePlants: () => void
    growPlant: (id: string) => void
    growAllPlants: () => void
    plantables: Plant[] | undefined
    setPlantables: (plantables: Plant[] | undefined) => void
}

export type PlantAction =
  | { type: 'CREATE'; plant: Plant }
  | { type: 'EDIT'; data: Plant }
  | { type: 'REMOVEALL' }
  | { type: 'REMOVE'; id: string | number }
  | { type: 'TICKONE'; id: string }
  | { type: 'TICKALL' };

export const COLS = 10
export const ROWS = 10