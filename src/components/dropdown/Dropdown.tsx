import { useState } from "react"
import ArrowDownIcon from "./ArrowDownIcon"

export default function Dropdown({ selected, options, onSelect }: any) {
    const [collapsed, setCollapsed] = useState(false)

    const selectedObject = options.find((o: any) => o.id === selected)
    const selectedIndex = options.indexOf(selectedObject)
    const unselectedObjects = options.toSpliced(selectedIndex, 1)
    const newOptions = [selectedObject].concat(unselectedObjects)

    return (
        <div className={"w-full h-full relative text-xl text-center text-white rounded-4xl -mb-50 transition-all z-50"}>
            <div className={"bg-blue absolute -z-10 w-full rounded-4xl transition-all " + (collapsed ? "h-[300%]" : "h-full")}></div>
            {newOptions.map((button: any, key: any) => {

                if (button.id === selected) {
                    return (
                        <div
                            key={key}
                            className={"max-h-full flex justify-center items-center gap-2 py-2 border-6 border-blue rounded-full transition-all bg-white text-blue cursor-pointer hover:bg-light-blue"}
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            {button.name}
                            <ArrowDownIcon className={"stroke-blue hidden xs:inline-block " + (collapsed ? "rotate-180" : null)} />
                        </div>
                    )
                } else {
                    return (
                        <div
                            key={key}
                            className={"max-h-full flex w-full justify-center items-center py-2 bg-blue border-6 border-blue  transition-all hover:bg-light-blue cursor-pointer " + (collapsed ? "opacity-100 delay-75 " : "opacity-0 ") + (key === options.length - 1 ? "rounded-b-4xl" : "")}
                            onClick={() => {
                                setCollapsed(false)
                                onSelect(button)
                            }}
                        >
                            {button.name}
                        </div>
                    )
                }
            })}

        </div>
    )
}