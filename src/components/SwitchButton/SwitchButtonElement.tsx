import { SwitchButtonElementButtonType, SwitchButtonElementType } from "./SwitchButtonType";

export default function ButtonsElement({ buttons, length, selectedButton, setSelectedButton, onChange }: SwitchButtonElementType) {
    return buttons.map((b: SwitchButtonElementButtonType, key: number) => {
        return (
            <div key={key}>
                <div
                    onClick={() => {
                        if (selectedButton !== key) {
                            setSelectedButton(key);
                            onChange(buttons[key]);
                        }
                    }}
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