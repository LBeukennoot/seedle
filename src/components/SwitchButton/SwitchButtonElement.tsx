import type { Mode } from "../../features/session/sessionTypes";
import type { SwitchButtonElementProps } from "./types";

export default function ButtonsElement({ options, length, selectedButton, setSelectedButton, onSelect }: SwitchButtonElementProps) {
    
    return options.map((value:string , index: number) => {
        const mode = value as Mode
        const modeName = mode.replace("_", " ")
        // const modeValue = Modes[mode]
        return (
            <div key={index}>
                <div
                    onClick={() => {
                        if (selectedButton !== index) {
                            setSelectedButton(index);
                            onSelect(mode);
                        }
                    }}
                    data-testid={'switchbuttonelement_' + mode + '_button'}
                    aria-selected={selectedButton === index}
                    className={"px-4 py-2 rounded-full border-6 border-blue transition-all whitespace-nowrap " + (selectedButton !== index ? "cursor-pointer hover:bg-light-blue" : null)}
                >
                    <a>{modeName}</a>
                    <div
                        className={"absolute flex items-center justify-center left-0 top-0 text-blue h-full w-1/3 z-50 transition-all duration-150 " + (selectedButton === index ? "opacity-100" : "opacity-0")}
                        style={{ left: (100 / length) * index + "%" }}
                    >{modeName}</div>
                </div>
            </div>
        );
    });
};