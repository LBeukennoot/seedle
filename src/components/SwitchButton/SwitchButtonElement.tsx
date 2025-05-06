import { SwitchButtonElementButtonType, SwitchButtonElementType } from "./SwitchButtonType";

export default function ButtonsElement({
    buttons,
    width,
    length,
    selectedButton,
    setSelectedButton,
    onChange,
}: SwitchButtonElementType) {
    return buttons.map((b: SwitchButtonElementButtonType, key: number) => {
        return (
            <div className="flex items-center" key={key}>
                <div
                    onClick={() => {
                        if (selectedButton !== key) {
                            setSelectedButton(key);
                            onChange(buttons[key]);
                        }
                    }}
                    className={"relative " + (selectedButton !== key ? "cursor-pointer" : null)}
                    style={{ width: width + "rem" }}
                >
                    {/* white text (when not button selected)*/}
                    <div
                        className={
                            "transition-all duration-150 text-white " +
                            (selectedButton === key ? "opacity-0" : "opacity-100")
                        }
                    >
                        {b.name}
                    </div>
                    {/* blue text (when button selected) */}
                    <div
                        className={
                            "text-blue z-50 absolute top-0 w-full transition-all duration-150 " +
                            (selectedButton === key ? "opacity-100" : "opacity-0")
                        }
                    >
                        {b.name}
                    </div>
                </div>
                {key !== length - 1 ? (
                    <div
                        className={"transition-all border-white rounded-full border-[0.12rem] h-2/3 absolute " + (selectedButton === key ? "opacity-0" : "")}
                        style={{ left: (key * width) + width + "rem" }}
                    ></div>
                ) : null}
            </div>
        );
    });
};