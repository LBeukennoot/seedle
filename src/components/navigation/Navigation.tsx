import { useContext, useState } from "react"
import { NavigationContext } from "../../providers/NavigationProvider"
import Tablist from "../Tablist"
import ScreenCard from "./screens/ScreenCard"

export default function Navigation() {

    const { ScreenElement } = useContext(NavigationContext)

    return (
        <div className="w-screen h-screen max-w-screen overflow-x-hidden bg-light-green text-blue font-lexend p-2">
            <div className="relative flex justify-center items-center ">
                <div className="max-w-xl w-full">


                    <div className="z-20 absolute max-w-xl w-full mt-15 md:mt-0">
                        <ScreenCard>
                            <ScreenElement />
                        </ScreenCard>
                    </div>


                    <div className="w-20 h-20 absolute top-0 z-10 md:-ml-15">
                        <Tablist />
                    </div>


                </div>
            </div>

        </div>
    )
}