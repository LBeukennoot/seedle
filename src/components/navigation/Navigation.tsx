import { useContext } from "react"
import { NavigationContext } from "../../providers/NavigationProvider"
import Tablist from "../Tablist"
import ScreenCard from "./screens/ScreenCard"

export default function Navigation() {

    const { ScreenElement } = useContext(NavigationContext)

    return (
        <div className="w-screen h-screen flex bg-light-green text-blue font-lexend items-center justify-center">

            <div className="flex justify-center items-center h-full">

                <div className="flex items-start h-[30rem]">
                    <div className="absolute -ml-15 z-10">
                        <Tablist />
                    </div>

                    <ScreenCard>
                        <ScreenElement />
                    </ScreenCard>
                </div>

            </div>
        </div>
    )
}