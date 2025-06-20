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
                    className={"px-4 py-2 rounded-full border-6 border-blue transition-all " + (selectedButton !== key ? "cursor-pointer hover:bg-light-blue" : null)}
                >
                    <a>{b.name}</a>
                    <div
                        className={"absolute flex items-center justify-center left-0 top-0 text-blue h-full w-1/3 z-50 transition-all duration-150 " + (selectedButton === key ? "opacity-100" : "opacity-0")}
                        style={{ left: (100 / length) * key + "%" }}
                    >{b.name}</div>
                    {/* {key !== length - 1 ? (
                        <div
                            className={"absolute top-0 h-full flex items-center z-[10] " + (selectedButton === key || selectedButton - 1 === key ? "opacity-0" : "")}
                            // className={"transition-all border-white rounded-full border-[0.12rem] h-2/3 absolute "}
                            // className={"transition-all border-white rounded-full border-[0.12rem] h-2/3 absolute " + (selectedButton === key ? "opacity-0" : "")}
                            style={{ left: (100 / length) * (key + 1) + "%" }}
                        >
                            {selectedButton === key}
                            <div className="border-2 border-white h-2/3 rounded-full justify-center -mr-2 group-hover:border-blue transition-all"></div>
                        </div>
                    ) : null} */}
                </div>
            </div>
        );
    });
};