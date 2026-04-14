import { useContext } from "react"
import { UserDataContext } from "./UserDataContext"
import type { UserData } from "./types"

export const useUserData = () => {
    const context = useContext<UserData>(UserDataContext)

    if (!context) {
        throw new Error("useUserData must be used within UserDataProvider")
    }

    return context
}