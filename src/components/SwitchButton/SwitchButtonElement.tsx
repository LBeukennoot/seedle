import type { SessionData } from "../Modes";
import type { SwitchButtonElementType } from "./types";

export default function ButtonsElement({ options, length, selectedButton, setSelectedButton, onSelect }: SwitchButtonElementType) {
    return options.map((b: SessionData, key: number) => {
        return (
            <div key={key}>
                <div
                    onClick={() => {
                        if (selectedButton !== key) {
                            setSelectedButton(key);
                            onSelect(options[key]);
                        }
                    }}
                    data-testid={'switchbuttonelement_' + b.id + '_button'}
                    aria-selected={selectedButton === key}
                    className={"px-4 py-2 rounded-full border-6 border-blue transition-all whitespace-nowrap " + (selectedButton !== key ? "cursor-pointer hover:bg-light-blue" : null)}
                >
                    <a>{b.name}</a>
                    <div
                        className={"absolute flex items-center justify-center left-0 top-0 text-blue h-full w-1/3 z-50 transition-all duration-150 " + (selectedButton === key ? "opacity-100" : "opacity-0")}
                        style={{ left: (100 / length) * key + "%" }}
                    >{b.name}</div>
                </div>
            </div>
        );
    });
};