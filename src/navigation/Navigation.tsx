import { useContext, useState } from "react"
import ScreenCard from "./screens/ScreenCard"
import { TabList } from "../components/TabList"
import { NavigationContext } from "../providers/NavigationContext"
import { Popup } from "../components/Popup/Popup"

export default function Navigation() {

    const { ScreenElement, popup } = useContext(NavigationContext)

    return (
        <div className="min-h-screen grid grid-rows-[30vh_1fr_1fr] bg-light-green">

            {/* top garden */}
            <div className="relative overflow-hidden h-full">
                <div className="h-full">
                    {/* garden top */}
                </div>
            </div>

            <div className="relative flex items-start inset-0 flex items-center justify-center">
                <div className="max-w-xl w-full">
                    <div className="absolute z-20 max-w-xl w-full mt-15 md:mt-0">
                        <ScreenCard>
                            <ScreenElement />
                        </ScreenCard>

                    </div>


                    <div className="w-20 h-20 absolute top-0 -z-0 md:-ml-15">
                        <TabList />
                    </div>


                </div>

            </div>

            {popup && <Popup> {popup} </Popup>}


            {/* bottom garden */}
            <div className="relative overflow-hidden h-full">
                <div className="h-full">
                    {/* garden bottom */}
                </div>
            </div>

        </div>
    )
}