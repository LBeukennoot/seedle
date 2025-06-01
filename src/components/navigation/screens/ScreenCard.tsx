import { useContext } from "react"
import { NavigationContext } from "../../../providers/NavigationProvider"

export default function ScreenCard({ children }: any) {
    const { expanded, setExpanded } = useContext(NavigationContext)

    return (
        <div className={"bg-white mx-auto max-w-xl rounded-tl-none rounded-[3.5rem] max-h-[30rem] z-20 transition-all " + (expanded ? "" : "p-5 w-full md:p-10 md:min-h-[15rem] md:min-w-[30rem]")}>
            <div className="max-h-[25rem]">
                {children}
            </div>
        </div>
    )
}