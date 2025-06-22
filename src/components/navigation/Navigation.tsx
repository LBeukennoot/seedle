import { useContext, useState } from "react"
import { NavigationContext } from "../../providers/NavigationProvider"
import Tablist from "../Tablist"
import ScreenCard from "./screens/ScreenCard"

export default function Navigation() {

    const { ScreenElement } = useContext(NavigationContext)

    return (
        <div className="w-screen h-screen flex bg-light-green text-blue font-lexend items-center justify-center">
            <div className="flex justify-center md:items-center h-full w-full md:w-auto m-2 md:m-0">
                <div className="md:flex items-start h-[30rem] w-full md:w-auto mt-2 md:m-0 relative">

                    <div className="z-20 relative mt-15 md:mt-0">
                        <ScreenCard>
                            <ScreenElement />
                        </ScreenCard>
                    </div>

                    <div className={"z-10 top-0 m-auto md:-ml-15 absolute "}>
                        <Tablist />
                    </div>

                </div>
            </div>
        </div>
    )
}