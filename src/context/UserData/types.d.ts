import type { Plant } from "../../components/PlantElement/types"

export type UserDataProviderProps = {
    children: string | JSX.Element | JSX.Element[]
}

export type UserDataContextType = {
    plants: Plant[]
    setPlants: Function
    createPlant: Function
}