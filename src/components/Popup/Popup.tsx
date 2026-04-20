import ScreenCard from "../ScreenCard/ScreenCard"
import type { PopupProps } from "./types"

export const Popup = ({ children }: PopupProps) => {
    return (
        <div className="absolute z-50">
            <div className="relative w-screen h-screen">
                <div className="absolute w-screen h-screen bg-green opacity-50"></div>
                <div className="absolute w-screen h-screen flex items-center justify-center -mt-25 font-lexend text-dark-blue">
                    <ScreenCard>
                        {children}
                        {/* <div className="w-full">
                            <h1 className="text-center text-4xl">title</h1>
                        </div> */}
                    </ScreenCard>
                </div>
            </div>
        </div>
    )
}