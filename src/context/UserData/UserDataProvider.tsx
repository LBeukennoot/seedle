import { useEffect, useState } from "react"
import { UserDataContext } from "./UserDataContext"
import LocalStorage from "../../utils/LocalStorage"
import type { UserData, UserDataProviderProps } from "./types"
import { Plant, Plants } from "../../components/PlantElement/types"

export const UserDataProvider = ({ children }: UserDataProviderProps) => {

    const localStorage = new LocalStorage()
    const initialRewards = () => {
        const rewards = localStorage.getValue('rewards')
        if (!rewards) return []
        return rewards
    }

    //@ts-ignore
    const [rewards, setRewards] = useState<[]>(initialRewards())



    const createReward = () => {
        return new Plant({ name: Plants.CHIRARY })
    }

    useEffect(() => {
        localStorage.setValue('rewards', rewards)
        console.log(localStorage.getValue('rewards'))
    }, [rewards])

    const value: UserData = {
        rewards,
        setRewards,
        createReward
    }

    return (
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    )
}