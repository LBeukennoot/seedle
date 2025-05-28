import { useState } from "react"
import ArrowDownIcon from "./ArrowDownIcon"

export default function Dropdown({ selected, options, onSelect }: any) {
    const [collapsed, setCollapsed] = useState(false)

    const selectedObject = options.find((o: any) => o.id === selected)
    const selectedIndex = options.indexOf(selectedObject)
    const unselectedObjects = options.toSpliced(selectedIndex, 1)
    const newOptions = [selectedObject].concat(unselectedObjects)

    return (
        <div className={"w-full relative text-xl text-center text-white bg-blue rounded-4xl -mb-50 transition-all " + (collapsed ? "h-[300%]" : "h-[100%]")}>
            {newOptions.map((button: any, key: any) => {

                if (button.id === selected) {
                    return (
                        <div
                            key={key}
                            className={"flex justify-center items-center gap-2 py-2 border-6 border-blue rounded-full transition-all bg-white text-blue cursor-pointer"}
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
                            className={"flex w-full justify-center items-center py-2 bg-blue border-6 border-blue rounded-full transition-all hover:bg-light-blue cursor-pointer " + (collapsed ? "opacity-100 delay-75" : "opacity-0")}
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