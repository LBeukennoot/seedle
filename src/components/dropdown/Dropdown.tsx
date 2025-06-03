import { useEffect, useState } from "react"
import ArrowDownIcon from "./ArrowDownIcon"

export default function Dropdown({ selected, options, onSelect }: any) {
    const [collapsed, setCollapsed] = useState(false)

    const id = cyrb53(options.map((o: any) => o.id).join()).toString()

    const selectedObject = options.find((o: any) => o.id === selected)
    const selectedIndex = options.indexOf(selectedObject)
    const unselectedObjects = options.toSpliced(selectedIndex, 1)
    const newOptions = [selectedObject].concat(unselectedObjects)

    const handleCloseDropdownOnOutsideClick = (e: any) => {
        e.target.id !== id && setCollapsed(false)
    }

    useEffect(() => {
        document.addEventListener('click', handleCloseDropdownOnOutsideClick)

        return () => document.removeEventListener('click', handleCloseDropdownOnOutsideClick)
    }, [])

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
                            id={id}
                        >
                            {button.name}
                            <ArrowDownIcon className={"stroke-blue hidden xs:inline-block " + (collapsed ? "rotate-180" : null)} id={id} />
                        </div>
                    )
                } else {
                    return (
                        <div
                            key={key}
                            className={"max-h-full flex w-full justify-center items-center py-2 bg-blue border-6 border-blue rounded-full transition-all hover:bg-light-blue cursor-pointer " + (collapsed ? "opacity-100 delay-75 " : "opacity-0 -z-50 !cursor-default ")}
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

const cyrb53 = (str: string, seed = 3) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};