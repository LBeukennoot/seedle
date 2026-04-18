import type { Plant } from "../../components/PlantElement/types"

export interface UserDataProviderProps {
    children: string | JSX.Element | JSX.Element[]
}

export type UserData = {
    plants: Plant[]
    setPlants: Function
    createPlant: Function
    // updatePlant: Function
}