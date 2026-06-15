import type { JSX } from "react"
import type { Plant } from "../../components/PlantElement/types"

export type PlantDataProviderProps = {
    children: string | JSX.Element | JSX.Element[]
}

export type PlantDataContextType = {
    plants: Plant[]
    setPlants: () => void
    removeAllPlants: () => void
    editPlant: (data: Plant) => void
    createPlant: (data: Omit<Plant, 'id' | 'createdAt'>) => void
    removePlant: (id: string) => void
    savePlants: () => void
    growPlant: (id: string) => void
}

export type PlantAction =
  | { type: 'CREATE'; plant: Plant }
  | { type: 'EDIT'; data: Plant }
  | { type: 'REMOVEALL' }
  | { type: 'REMOVE'; id: string | number }
  | { type: 'TICK'; id: string };

export const COLS = 10
export const ROWS = 10