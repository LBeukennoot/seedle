import { useEffect, useState } from "react";
import ButtonsElement from "./SwitchButtonElement";
import { SwitchButtonType } from "./SwitchButtonType";

/**
 * Clickable object (button) that switches between multiple options
 *
 * @author      LBeukennoot for Seelde
 * @created     28-04-2025
 */
export default function SwitchButton({ buttons = [], width = 7, selected = "", onChange = () => { } }: SwitchButtonType) {
    const [selectedButton, setSelectedButton] = useState<number>(0);

    useEffect(() => {
        //searches for selected id in buttons[]
        setSelectedButton(buttons.indexOf(buttons.find((b) => b.id === selected)))
    }, [selected])

    const length = buttons.length;

    return (
        <div className="flex justify-center pb-6 text-lg">
            <button>
                <div className="h-12 flex items-center bg-blue rounded-xl relative">
                    <ButtonsElement
                        buttons={buttons}
                        width={width}
                        length={length}
                        selectedButton={selectedButton}
                        setSelectedButton={setSelectedButton}
                        onChange={onChange}
                    />

                    <div
                        className="border-blue bg-white rounded-xl border-6 absolute h-full top-0 transition-all duration-150"
                        style={{ left: selectedButton * width + "rem", width: width + "rem" }}
                    ></div>
                </div>
            </button>
        </div>
    );
}
