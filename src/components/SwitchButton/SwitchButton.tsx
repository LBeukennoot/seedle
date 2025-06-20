import { useEffect, useState } from "react";
import ButtonsElement from "./SwitchButtonElement";
import { SwitchButtonType } from "./SwitchButtonType";

/**
 * Clickable object (button) that switches between multiple options
 *
 * @author      LBeukennoot for Seelde
 * @created     28-04-2025
 */
export default function SwitchButton({ buttons = [], selected = "", onChange = () => { } }: SwitchButtonType) {
    const getSelectedButtonIndex = () => buttons.indexOf(buttons.find((b) => b.id === selected))

    const [selectedButton, setSelectedButton] = useState<number>(getSelectedButtonIndex());

    useEffect(() => {
        //searches for selected id in buttons[]
        setSelectedButton(getSelectedButtonIndex())
    }, [selected])

    const length = buttons.length;

    return (
        <div className="flex justify-center pb-6 text-lg">
            <button>
                <div className="grid grid-cols-3 bg-blue text-white text-xl rounded-full relative group">
                    <ButtonsElement
                        buttons={buttons}
                        length={length}
                        selectedButton={selectedButton}
                        setSelectedButton={setSelectedButton}
                        onChange={onChange}
                    />

                    <div
                        className="border-blue bg-white rounded-full border-6 absolute h-full top-0 transition-all duration-150 w-1/3"
                        style={{ left: (100/length) * selectedButton + "%" }}
                    ></div>
                </div>
            </button>
        </div>
    );
}
