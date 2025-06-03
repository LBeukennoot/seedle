import { useContext, useState } from "react"
import { NavigationContext } from "../../providers/NavigationProvider"
import Tablist from "../Tablist"
import ScreenCard from "./screens/ScreenCard"
import { useDraggable } from "@dnd-kit/core"

export default function Navigation() {

    const { ScreenElement, expanded } = useContext(NavigationContext)

    const [height, setHeight] = useState(0);

    return (
        <div className="w-screen h-screen flex bg-light-green text-blue font-lexend items-center justify-center">

            <div className="flex justify-center md:items-center h-full w-full md:w-auto m-2 md:m-0">

                <div className="md:flex items-start h-[30rem] w-full md:w-auto mt-2 md:m-0">
                    <div className={"z-10 " + (expanded ? "" : "m-auto md:-ml-15 md:absolute max-w-xl")}>
                        <Tablist expanded={expanded} />
                    </div>


                    <ScreenCard>
                        <ScreenElement />

                        {/* TODO drag down functionality
                        <div className="relative flex md:hidden justify-center">
                            <div className="absolute float bg-blue h-1.5 w-20 rounded-full mt-1">
                            </div>
                        </div> */}
                    </ScreenCard>
                </div>

            </div>
        </div>
    )
}